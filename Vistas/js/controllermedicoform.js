const seleccioncont = document.querySelector(".seleccionespecialidadcont");
const confirmarcont = document.querySelector(".confirmacioncont");

const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".formregistrocont button")

const formcont = document.querySelector(".formcont");

const tablecont = document.querySelector(".selectcont");
const formregistro = document.querySelector(".formregistrocont");


const formMedicoregistro = document.querySelector(".formmedicocont");




function cambiotabla(){

    if(tablecont.classList.contains("active")){

        buttoncambio.innerHTML = "Cancelar";

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");


    }
    else{
      
      buttoncambio.innerHTML = "Registrar";
      
      tablecont.classList.add("active");
        formregistro.classList.remove("active");
        formcont.classList.add("select");

    }
   
}



function abrirespecialidades(){

    let inputnombre = document.querySelector(".formregistrocont .input_nombremedico")
    let inputapellido = document.querySelector(".formregistrocont .input_apellidomedico")

    let inputcedula = document.querySelector(".formregistrocont .input_cedulamedico")

    if (inputnombre.value === "" || inputapellido.value === "" || inputcedula.value === "") {
        alert("Por favor llene todos los campos");
        return;
    }



    
    if(seleccioncont.classList.contains("active")){
        

        seleccioncont.classList.remove("active");
        confirmarcont.classList.add("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formMedicoregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");

    }
    else if (formMedicoregistro.classList.contains("active")){

        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");
        formMedicoregistro.classList.remove("active");

    }

}

function cerrarrespecialidades(){

    


    if(seleccioncont.classList.contains("active")){
        
        formMedicoregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formMedicoregistro.classList.remove("active");
        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");

    }
    

}


const especialidades = document.querySelectorAll(".especialidadcont");


for (let i = 0; i < especialidades.length; i++) {

    const especialidad = especialidades[i].getElementsByTagName("div")[0];
    const nombre = especialidad.innerHTML;
  
    especialidades[i].addEventListener('click', function(event) {

        if(especialidades[i].classList.contains("selected")){

            
            especialidades[i].classList.remove("selected");
            
        }else{

            especialidades[i].classList.add("selected");
            alert("Has seleccionado " + nombre);
        }

     
    });
  }