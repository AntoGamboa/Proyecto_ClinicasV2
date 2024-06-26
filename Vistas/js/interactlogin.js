

//abre el modo registrar

function cambio_registrar() {
  var elemento = document.querySelector(".loginregister_container");

  elemento.classList.add("oscuro");
  var elementos = document.querySelectorAll(".contenedor_box");

  elementos.forEach(function (elemento) {
    elemento.style.color = "white";
  });

  elementos = document.querySelectorAll(".contenedor_box input");

  elementos.forEach(function (elemento) {
    elemento.style.color = "white";
  });

  var registerbox = document.querySelector(".register_box");
  var loginbox = document.querySelector(".login_box");

  loginbox.classList.remove("active");
  registerbox.classList.add("active");




  let body = document.body;
  body.classList.toggle("dark-mode");
  
  
}


//abre modo iniciar sesion

function cambio_iniciarsesion() {

  var elemento = document.querySelector(".loginregister_container");
  elemento.classList.remove("oscuro");

  var elementos = document.querySelectorAll(".contenedor_box");

  elementos.forEach(function (elemento) {
    elemento.style.color = "rgb(22, 145, 216)";
  });

  elementos = document.querySelectorAll(".contenedor_box input");

  elementos.forEach(function (elemento) {
    elemento.style.color = "black";
  });

  var registerbox = document.querySelector(".register_box");
  var loginbox = document.querySelector(".login_box");

  loginbox.classList.add("active");
  registerbox.classList.remove("active");

  let body = document.body;
  body.classList.toggle("dark-mode");
  
  

}

//codigo para validaciones

const inputs = document.querySelectorAll('input');

function validarInput(event) {
  const valor = event.target.value;
  const caracteresEspeciales = /[$%^()+\=\[\]{}'"\\|<>\/?]+/;
  
  if (caracteresEspeciales.test(valor)) {
    event.target.value = valor.replace(caracteresEspeciales, '');
  }
}

inputs.forEach(input => {
  input.addEventListener('input', validarInput);
});