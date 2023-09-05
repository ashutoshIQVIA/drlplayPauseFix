function updateIfram1()
{   
    event.preventDefault()
    iframeSrc.src = 'slides/slide2/index.html'
    event.preventDefault()
}

CLMPlayer.registerEventListener("returntocallbuttonpress", CallbuttonPlayerHandler);
CLMPlayer.registerEventListener("cancelbuttonpress", CancelbuttonPlayerHandler);
CLMPlayer.registerEventListener("pausebuttonpress", disableTracking);
CLMPlayer.registerEventListener("playbuttonpress", enableTracking);
//CLMPlayer.registerEventListener("playbuttonpress", CallbuttonPlayerHandlerProductMessage); returntocallbuttonpress, cancelbuttonpress
