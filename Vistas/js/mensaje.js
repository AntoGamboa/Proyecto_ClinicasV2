
function generarmensaje(titulo, mensaje){

    var contenedor = document.querySelector(".mensajecont");

    var conttitulo = document.querySelector(".mensajecont .mensaje .titulomensaje");

    var contmensaje = document.querySelector(".mensajecont .mensaje .contenidomensaje");

    conttitulo.textContent = titulo;

    contmensaje.textContent = mensaje;

    contenedor.classList.toggle("activo");
}

const botoncerrar = document.querySelector(".mensajecont .mensaje button");

botoncerrar.addEventListener("click", ()=>{

    var contenedor = document.querySelector(".mensajecont");

    contenedor.classList.toggle("activo");

})