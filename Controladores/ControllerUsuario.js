const CrearRegistro= function (datos,accion)
{
    let formdata= new FormData(datos);
    formdata.append("accion",accion);
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
