document.addEventListener('DOMContentLoaded',e =>{
    verificarSession();

})
const verificarSession = async() =>
 {
    await fetch('https://localhost/Proyecto_ClinicasV2/MiddleWare/autenticacion.php',{
        method:'GET'
    }).then(resp => resp.json)
    .then(data =>{
        if(!data.Sucess)
        {
            window.location.href = "http://localhost/Proyecto_ClinicasV2/vistas/login.html"
        }
    })
 };