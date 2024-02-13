let EnviarFormulario = document.getElementById('formregistromedico');
document.addEventListener('DOMContentLoaded',e =>{
    let formdata = new FormData();
    formdata.append('accion','readAll');
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Medico.php',{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    
});
console.log('conectado')
EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    let formdata = new FormData(EnviarFormulario);
    formdata.append('accion','create');
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Medico.php',{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

});