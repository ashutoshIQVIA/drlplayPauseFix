CLMPlayer = {};

CLMPlayer.fetch = function(query, callbackMethod){
    var message = {
        "request": "fetch",
        "params": {"query": query, "callbackMethod": callbackMethod }
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.fetchWithParams = function(query, parameters, callbackMethod){
    var message = {
        "request": "fetchWithParams",
        "params": {"query": query, "queryParameters": parameters, "callbackMethod": callbackMethod }
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.upsert = function(objects, callbackMethod){
    var message = {
        "request": "upsert",
        "params": {"objects": objects, "callbackMethod": callbackMethod }
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.launchApprovedEmail = function(){
    var message = {
        "request": "launchApprovedEmail"
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.launchEmails = function(templates = []){
    var message = {
        "request": "launchEmails",
        "params": {"templates": templates}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.getSurveyFlowJsonForCall = function (json){
    var message = {
        "request": "getSurveyFlowJsonForCall",
        "params": {"json": json}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.getSurveyFlowJson = function (json){
    var message = {
        "request": "getSurveyFlowJson",
        "params": {"json": json}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.updateFeedback = function (type){
    var message = {
        "request": "updateFeedback",
        "params": {"type": type}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.gotoSlide = function (sequenceId, slideName, animation){
    var message = {
        "request": "gotoSlide",
        "params": {"sequenceId": sequenceId, "slideName": slideName, "animation": animation}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.goPreviousSequence = function (){
    var message = {
        "request": "goPreviousSequence",
        "params": {}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.goNextSequence = function (){
    var message = {
        "request": "goNextSequence",
        "params": {}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.stopTrackingPage = function (){
    var message = {
        "request": "stopTrackingPage",
        "params": {}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.startTrackingPage = function (pageid){
    var message = {
        "request": "startTrackingPage",
        "params": {"pageid": pageid}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.saveState= function (state){
    var message = {
        "request": "saveState",
        "params": {"state": state}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.alert = function (message){
    var message = {
        "request": "alert",
        "params": {"msg": message}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.logError = function (errorMessage){
    var message = {
        "request": "logError",
        "params": {"errorMessage": errorMessage}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.pauseVideoPlayback = function (){
    const all = document.getElementsByTagName("video");
    for (let i = 0, max = all.length; i < max; i++) {
        const element = all[i];
        element.pause();
    }
}

CLMPlayer.addAction = function (action, detailed_time, from_time, to_time, product_id, page, message_id, slide_order, category, reaction_type, questions_raised, extra_1, extra_2, extra_3, extra_4, extra_5, assets){
    var message = {
        "request": "addAction",
        "params": {
            "action__c" : action,
            "detailedtime__c" : detailed_time,
            "fromtime__c" : from_time,
            "totime__c" : to_time,
            "product__c" : product_id,
            "pageid__c" : page,
            "productmessageexternalid__c" : message_id,
            "slideorder__c" : slide_order,
            "category__c" : category,
            "reaction__c" : reaction_type,
            "questionraised__c" : questions_raised,
            "extra1__c" : extra_1,
            "extra2__c" : extra_2,
            "extra3__c" : extra_3,
            "extra4__c" : extra_4,
            "extra5__c" : extra_5,
            "assets" : assets
        }
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

/**
 * Event callbacks - ability to register JS functions defined in the presentation slide code, which are being invoked when a respective event occurs on the iOS native interface
 */

CLMPlayer.registeredEvents = {};

CLMPlayer.registerEventListener = function (eventType, funct){
    if(CLMPlayer.registeredEvents[eventType] == null)
        CLMPlayer.registeredEvents[eventType] = [];
    CLMPlayer.registeredEvents[eventType][CLMPlayer.registeredEvents[eventType].length] = funct;
}

CLMPlayer.executeEvent = function (eventType, eventParam){
    var listeners = CLMPlayer.registeredEvents[eventType];
    if(listeners != null)
        for (var i in listeners)
            listeners[i](eventParam);
}

// JS functions to enable / disable swipe listening on portion of the screen

CLMPlayer.defineNoSwipeRegion = function (regionId, x, y, width, height){
    var message = {
        "request": "defineNoSwipeRegion",
        "params": {
            "regionId": regionId,
            "x": x,
            "y": y,
            "width": width,
            "height": height
        }
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

CLMPlayer.destroyNoSwipeRegion = function (regionId){
    var message = {
        "request": "destroyNoSwipeRegion",
        "params": {"regionId": regionId}
    }
    webkit.messageHandlers.nativeCall.postMessage(JSON.stringify(message));
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
    var message = "";
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
        // check if details available. For some kinds of errors details are hidden (CORS etc...)
        message = msg;
    } else {
        message = [
          'Message: ' + msg,
          'URL: ' + url,
          'Line: ' + lineNo,
          'Column: ' + columnNo,
          'Error object: ' + JSON.stringify(error)
        ].join(' - ');
    }
    CLMPlayer.logError(message);
    return false;
};
