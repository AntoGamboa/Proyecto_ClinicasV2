const CrearRegistro= function (accion)
{
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let correo = document.getElementById('correo').value;
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('contraseña').value;

    let formdata= new FormData();
    
    formdata.append("accion",accion);
    formdata.append("nombre",nombre);
    formdata.append("apellido",apellido);
    formdata.append("correo",correo);
    formdata.append("usuario",usuario);
    formdata.append("contraseña",password);
    
    fetch("/Modelos/modesUsuario.php",
        {
            method: "POST",
            body: formdata
        }
    )
    .then(function (response)
    {
        if(response.ok)
        {
            alert("registro exitoso");
        }
        else
        {
            throw new console.error("Fallo al realizar el registro");
        }
    }
    
    
    )
    
}
