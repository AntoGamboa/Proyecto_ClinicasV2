

/*
const sesion = verificarSession();

if(sesion.permisos != 1){

    window.location.href = "http://localhost/Proyecto_ClinicasV2/vistas/menuprincipal.html"
  
}

*/

function subirform(){

    var nombre = document.querySelector(".input_nombreespecialidad");

    data = new FormData;

    data.append(nombre, 'nombreespecialidad');

    fetch('',{

        method : 'POST',
        body : data
    })
    .then(Response => Response.json())
    .then(function(data){
            alert("datos subidos correctamente, detalles:" + data)
    })
    .catch(function(error) {
        console.error('Fallido', error);
        throw error;
      });
}

function recuperacion(){

    fetch('')
    .then(Response => Response.json())
    .then(function(data){
           
        //hacer algo

    })

    .catch(function(error) {

        console.error('Fallido', error);
        throw error;

    });
}



