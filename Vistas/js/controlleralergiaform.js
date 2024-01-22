function subirform(){

    var nombre = document.querySelector(".input_nombre");

    data = new FormData;

    data.append(nombre, 'nombrealergia');

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