
const body=document.body;

const light=document.getElementById("lightBtn");

const dark=document.getElementById("darkBtn");

/* Load theme */

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){

    body.classList.add("dark");

    dark.classList.add("active");

}else{

    light.classList.add("active");

}

/* Dark */

dark.onclick=function(){

    body.classList.add("dark");

    dark.classList.add("active");

    light.classList.remove("active");

    localStorage.setItem("theme","dark");

}

/* Light */

light.onclick=function(){

    body.classList.remove("dark");

    light.classList.add("active");

    dark.classList.remove("active");

    localStorage.setItem("theme","light");

}
