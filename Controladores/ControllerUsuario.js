let vista = 'http://localhost/Proyecto_ClinicasV2/Vistas/medicoform.html';
let rutapromesa='http://localhost/Proyecto_ClinicasV2/Modelos/modelUsuarios.php';
let Enviarformulario= document.getElementById('formregistro');
let formLogin= document.getElementById('formLogin');



formLogin.addEventListener('submit', e => {
    e.preventDefault();
    let formdata = new FormData(formLogin);
    formdata.append("accion","logearse");
    fetch( rutapromesa, 
    {
        method:'POST',
        body:formdata 
    })
    .then( resp =>resp.json())
    .then(data => {
        console.log(data);
       if(data.Success != false)
       {
            window.location.href = "http://localhost/Proyecto_ClinicasV2/vistas/consultas.html"
       }
    });
});
Enviarformulario.addEventListener('submit',function(e)
{
    e.preventDefault();
    let formData= new FormData(Enviarformulario);
    formData.append("accion","crearregistro");
    fetch(rutapromesa,
    {
        method:'POST',
        body:formData
    })
    .then(resp => resp.json())
    .then(data =>{
            console.log(data);
    })
    .catch(error => console.error("error: ", error.message));
});

