let myArray = ["a","b","c"]

let newArray = myArray.map((ele)=>{
    if(ele == "a"){
        return ele + "bc"
    }else{
        return ele
    }
})

console.log(newArray)