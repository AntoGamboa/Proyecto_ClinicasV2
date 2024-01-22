function subirform(){

    var nombre = document.querySelector(".input_nombremedico");
    var apellido = document.querySelector(".input_apellidomedico");
    var cedula = document.querySelector(".input_cedulamedico");

    data = new FormData;

    data.append(nombre, 'nombremedico');
    data.append(apellido, 'apellidomedico');
    data.append(cedula, 'cedulamedico');

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