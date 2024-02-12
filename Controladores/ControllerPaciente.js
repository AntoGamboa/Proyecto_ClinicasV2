let formPaciente = document.getElementById('formPaciente');

document.addEventListener('DOMContentLoaded',e=>{
    formdata= new FormData();
    formdata.append('accion','readAll')
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php',{
        method:'POST',
        body:formdata     
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
});

formPaciente.addEventListener('submit', e =>{
    e.preventDefault();
    let formdata = new FormData(formPaciente);
    formdata.append('accion','create');   
    console.log(formdata) 
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php',{
        method:'POST',
        body: formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
});