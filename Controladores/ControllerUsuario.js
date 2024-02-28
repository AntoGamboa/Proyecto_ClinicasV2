let vista = 'https://localhost/Proyecto_ClinicasV2/Vistas/medicoform.html';
let rutapromesa='https://localhost/Proyecto_ClinicasV2/Modelos/modelUsuarios.php';
let Enviarformulario= document.getElementById('formregistro');
let formLogin= document.getElementById('formLogin');

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
    .then(resp => 
    {
       return resp.json()
    })
    .then(data =>{
            console.log(data);
    })
    .catch(error => console.error("error: ", error.message));
});

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
       if(data === false)
       {
            alert('Error usuario o contraseña invalida')
       }
       else{
            alert(`Bienvenido al Sistema ${data.nombre}`)
            location.replace(vista);
       }

    });
});

