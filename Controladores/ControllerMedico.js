let EnviarFormulario = document.getElementById('formregistromedicos');
EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    console.log('le diste en mandar el formulario')
});
console.log('conectado');