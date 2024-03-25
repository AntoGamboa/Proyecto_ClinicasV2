var pacienttablecont = document.querySelector(".pacientselectcont");
var pacientformcont = document.querySelector(".pacientform");
var formcont = document.querySelector(".pacientformcont");
const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".button.btnRegistrar");
let accionform= document.getElementById('accionFormulario');

const paginasform = document.querySelector(".formpages");

var seleccion = false;

var alergias = [];



var funcion = "registrar_consulta"; //aqui se determina que funcion va a realizar el submit, registrar_paciente, registrar_consulta y modificar

function cambiotabla(){

    if(pacienttablecont.classList.contains("active")){

      //abrir form

      buttoncambio.innerHTML = "Cancelar"
      accionform.value='create';
      pacienttablecont.classList.remove("active");
      pacientformcont.classList.add("active");
      formcont.classList.remove("registro");

      funcion= "registrar_paciente";


    }
    else{

      //cerrar form

      buttoncambio.innerHTML = "Registrar";
      
      pacienttablecont.classList.add("active");
      pacientformcont.classList.remove("active");
      pacientformcont.reset();
      formcont.classList.add("registro");

      botonregistro.innerHTML = "Registrar"

      funcion = "registrar_consulta";

      while (paginasform.classList.length > 1) {
        paginasform.classList.remove(paginasform.classList.item(1));
      }

      paginasform.classList.add("paciente");

      alergias = [];

      reiniciarseleccion();
      seleccion= false;

    }
   
}

function cambiotablaeditar(variables){

  if(pacienttablecont.classList.contains("active")){


    buttoncambio.innerHTML = "Cancelar"
    accionform.value='update';
    pacienttablecont.classList.remove("active");
    pacientformcont.classList.add("active");
    formcont.classList.remove("registro");

    
    botonregistro.innerHTML = "Modificar";

    funcion = "modificar";
    
    pacientformcont.querySelector(".input_cedula").value = variables[0].innerHTML;
    pacientformcont.querySelector(".input_nombre").value = variables[1].innerHTML;
    pacientformcont.querySelector(".input_apellido").value = variables[2].innerHTML;
   
    pacientformcont.querySelector(".input_telefono").value = variables[3].innerHTML;
    pacientformcont.querySelector(".input_telefonoemergencia").value = variables[4].innerHTML;
    

  }
  else{
    
    buttoncambio.innerHTML = "Registrar";
    
    pacienttablecont.classList.add("active");
    pacientformcont.classList.remove("active");
    formcont.classList.add("registro");
    
    

  }
 
}

//codigo para avanzar en las paginas del formulario

function avanzar(){

  if(paginasform.classList.contains("paciente")){

    paginasform.classList.toggle("paciente");
    paginasform.classList.toggle("alergia");
    

  }
  else if(paginasform.classList.contains("alergia")  && alergias.length > 0){


    paginasform.classList.toggle("alergia");
    

    

  }


}

//codigo para retroceder en las paginas del formulario

function retroceder(){

  if(paginasform.classList.contains("alergia")){

    paginasform.classList.toggle("alergia");
    paginasform.classList.toggle("paciente");

    
  }


}


//reinicia selecciones

function reiniciarseleccion(){
    alergiascont.forEach(alergia =>{

        if(alergia.classList.contains("selected")){
            alergia.classList.remove("selected");
        }

    });
}











const alergiascont = document.querySelectorAll(".alergiacont");

for (let i = 0; i < alergiascont.length; i++) {
  
    alergiascont[i].addEventListener('click', function(event) {

        if(alergiascont[i].classList.contains("selected")){

            alergiascont[i].classList.remove("selected");

            const borrar = alergias.indexOf( alergiascont[i].innerHTML)

            if (borrar !== -1) {
              alergias.splice(borrar, 1);
            }

            

            
        }else{

            alergiascont[i].classList.add("selected");
            alergias.push(alergiascont[i].innerHTML);
            
            
        }

     
    });
}


var inputs = document.querySelector(".searchbarcont input");

const tabla = document.getElementById("tabla_datos");

tabla.addEventListener('click', function(event) {

  const target = event.target;
 if (target.classList.contains('edit-button')) {

    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");

    cambiotablaeditar(variables);
       
    }

});

for (var i = 0; i < inputs.length; i++) {

inputs[i].addEventListener("input", function (event) {

  console.log(event.target.value);
  tabla.innerHTML ="";



});

}







