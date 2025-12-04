let mode = document.querySelector("#Mode");
let curMode ="dark"
mode.addEventListener("click",()=>{
    if(curMode==="dark"){
        curMode="light"
        document.querySelector("#main").style.backgroundColor ="white";
        document.querySelector("#main").style.Color ="black";

    }else{
        curMode="dark"
        document.querySelector("#main").style.backgroundColor ="#0f0f0f";
           document.querySelector("#main").style.Color ="white";
    }
    console.log(curMode);
})