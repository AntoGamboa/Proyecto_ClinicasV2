const seleccioncont = document.querySelector(".seleccionespecialidadcont");
const confirmarcont = document.querySelector(".confirmacioncont");

const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".formregistrocont .btnRegistrar")

const botoneditar = document.querySelector(".formregistrocont .btneditar")

const formcont = document.querySelector(".formcont");

const tablecont = document.querySelector(".selectcont");
const formregistro = document.querySelector(".formregistrocont");


const formMedicoregistro = document.querySelector(".formmedicocont");

const especialidades = document.querySelectorAll(".especialidadcont");

const tabla = document.getElementById("tabla_datos");

let accionForm = document.getElementById('accionFormulario');


function cambiotabla(){

    //abrir form

    if(tablecont.classList.contains("active")){

        buttoncambio.innerHTML = "Cancelar";
        accionForm.value = 'create';
        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");
    }
    else{

    //cerrar form
      
        buttoncambio.innerHTML = "Registrar";
        
        tablecont.classList.add("active");
        formregistro.classList.remove("active");
        formcont.classList.add("select");
        formregistro.reset();
        botoneditar.style.display = 'none';
        botonregistro.style.display = 'flex';

        formMedicoregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");
        
        

    }
   
}



function abrirespecialidades(){

    //validaciones

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


function cambiotablaeditar(variables){

    //abrir editar

    if(tablecont.classList.contains("active")){
  
        buttoncambio.innerHTML = "Cancelar";

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");
        botoneditar.style.display = 'flex';
        botonregistro.style.display = 'none';
        accionForm.value = 'update';
        formcont.querySelector(".input_nombremedico").value = variables[1].innerHTML;
        formcont.querySelector(".input_apellidomedico").value = variables[2].innerHTML;
        formcont.querySelector(".input_cedulamedico").value = variables[0].innerHTML;
  
    }
    else{
      
      
      
      
  
    }
   
}

function asignarespecialidades(cedula){


    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch('../Modelos/especialidad.php',{

        method:'POST',
        body:formdata

    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        especialidades.forEach(element => {
            data.forEach(especialidad)
            if(element.innerHTML == especialidades){

                element.classList.add("selected")
            }
        
        });

       
    })
    
}



var inputs = document.querySelector("input");



tabla.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button')) {
    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");
    cambiotablaeditar(variables);}

});




document.addEventListener("DOMContentLoaded", function(){

    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch('../Modelos/especialidad.php',{

        method:'POST',
        body:formdata

    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        
            data.forEach(especialidad)


            
            
        
    });

       
   

    
})


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