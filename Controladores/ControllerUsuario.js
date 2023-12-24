let Enviarformulario= document.getElementById('formregistro');
Enviarformulario.addEventListener('submit',function(e)
{
    e.preventDefault();
    console.log("me diste click")
    let formData= new FormData(Enviarformulario);
    formData.append("accion","crearregistro");
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/modelUsuarios.php',
    {
        method:'POST',
        body:formData
    })
    .then(resp => 
    {
        if(resp.ok)
        {
            console.log("comunicacion Exitosa");
        }
       return resp.json()

    })
    .then(data => 
        {
            console.log(data);
        })
    .catch(error => console.error("error: ", error.message));
   
});

