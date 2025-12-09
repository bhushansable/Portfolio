
let mode_fun =()=>{

    let mode = document.querySelector("#Mode");
    let curMode ="dark"


    mode.addEventListener("click",()=>{
    if(curMode==="dark"){
        curMode="light"
        document.querySelector("#main").style.backgroundColor ="white";
        document.querySelector("#main").style.Color ="black";
        document.querySelector("#star1").style.backgroundColor ="#00E5FF"
        document.querySelector("#star2").style.backgroundColor ="#00E5FF"
        document.querySelector("#star3").style.backgroundColor ="#00E5FF"
        document.querySelector("#star4").style.backgroundColor ="#00E5FF"



    }else{
        curMode="dark"
        document.querySelector("#main").style.backgroundColor ="#0f0f0f";
        document.querySelector("#main").style.Color ="white";
        document.querySelector("#star1").style.backgroundColor ="white"
        document.querySelector("#star2").style.backgroundColor ="white"
        document.querySelector("#star3").style.backgroundColor ="white"
        document.querySelector("#star4").style.backgroundColor ="white"
    }
    console.log(curMode);
})

}

mode_fun()