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






function abrirespecialidades(){

    const seleccioncont = document.querySelector(".seleccionespecialidadcont");
    const confirmarcont = document.querySelector(".confirmacioncont");
    const formregistro = document.querySelector(".formmedicocont");


    if(seleccioncont.classList.contains("active")){
        

        seleccioncont.classList.remove("active");
        confirmarcont.classList.add("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");

    }
    else if (formregistro.classList.contains("active")){

        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");
        formregistro.classList.remove("active");

    }

}

function cerrarrespecialidades(){

    const seleccioncont = document.querySelector(".seleccionespecialidadcont");
    const confirmarcont = document.querySelector(".confirmacioncont");
    const formregistro = document.querySelector(".formmedicocont");


    if(seleccioncont.classList.contains("active")){
        
        formregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formregistro.classList.remove("active");
        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");

    }
    

}