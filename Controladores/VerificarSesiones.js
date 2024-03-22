document.addEventListener('DOMContentLoaded', e =>{
    verificarSession();

})
const verificarSession = () =>
 {
     fetch('http://localhost/Proyecto_ClinicasV2/MiddleWare/autenticacion.php')
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);
        if(!data.Success)
        {
            window.location.href = "http://localhost/Proyecto_ClinicasV2/vistas/login.html"
        }
    })
 };