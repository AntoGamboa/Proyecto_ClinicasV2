const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll(".spannav");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");

const botones = document.querySelectorAll('.boton');
const boton = botones[0];
const boton2 = botones[1];

menu.addEventListener("click",()=>{

    barraLateral.classList.toggle("max-barra-lateral");

    if(barraLateral.classList.contains("max-barra-lateral")){

        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";

    }
    else{

        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";

    }
    if(window.innerWidth<=320){

        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        })
        
    }
});

boton.addEventListener("click", ()=>{
    window.location.href = "menuprincipal.html";
});

boton2.addEventListener("click", ()=>{
    window.location.href = "reportes.html";
});

cloud.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
   
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    });
});


//crear botones


function crearbotonesnav(){


    //funcion prueba para actualizar botones de el nav
    return;

    
    const templatebotonnav = document.getElementById("templatebotonnav").content;
    const barranav = document.querySelector(".navbar .barra-lateral .navegacion ul");
 
    const clontemplate = templatebotonnav.cloneNode(true);

    clontemplate.querySelector("span").textContent = "aaa";

    clontemplate.querySelector("ion-icon").clonspan.name = "home-outline";

    barranav.appendChild(clontemplate);

}
    

    



