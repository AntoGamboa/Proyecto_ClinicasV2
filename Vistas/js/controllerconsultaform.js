var pacienttablecont = document.querySelector(".pacientselectcont");
var pacientformcont = document.querySelector(".pacientform");
var formcont = document.querySelector(".pacientformcont");
const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".pacientform button")

var seleccion = false;

var variablespaciente = []; //en esta variable se guardan los datos del paciente seleccionado

var funcion = "registrar_consulta"; //aqui se determina que funcion va a realizar el submit, registrar_paciente, registrar_consulta y modificar

function cambiotabla(){

    if(pacienttablecont.classList.contains("active")){

      //abrir form

      buttoncambio.innerHTML = "Cancelar"
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

    }
   
}

function cambiotablaeditar(variables){

  if(pacienttablecont.classList.contains("active")){


    buttoncambio.innerHTML = "Cancelar"
    pacienttablecont.classList.remove("active");
    pacientformcont.classList.add("active");
    formcont.classList.remove("registro");

    
    botonregistro.innerHTML = "Modificar";

    funcion = "modificar";
    
    
    pacientformcont.querySelector(".input_nombre").value = variables[0].innerHTML;
    pacientformcont.querySelector(".input_apellido").value = variables[1].innerHTML;
    pacientformcont.querySelector(".input_cedula").value = variables[2].innerHTML;
    pacientformcont.querySelector(".input_telefono").value = variables[3].innerHTML;
    pacientformcont.querySelector(".input_telefonoemergencia").value = variables[0].innerHTML;
    

  }
  else{
    
    buttoncambio.innerHTML = "Registrar";
    
    pacienttablecont.classList.add("active");
    pacientformcont.classList.remove("active");
    formcont.classList.add("registro");
    
    

  }
 
}


const tablaDatos = document.getElementsByTagName("tr");

for (let i = 0; i < tablaDatos.length; i++) {

  const fila = tablaDatos[i];
  const nombre = fila.querySelectorAll("td")[0];

  fila.addEventListener('click', function(event) {

    if (fila.classList.contains("selected")) {

      fila.classList.remove("selected");
      seleccion = false;

    }else if(seleccion != true ) {

      fila.classList.add("selected");

      variablespaciente = [];

      var celdas = fila.getElementsByTagName("td");

      ;

      variablespaciente = [
        { nombre: celdas[0].innerHTML },
        { apellido: celdas[1].innerHTML },
        { cedula: celdas[2].innerHTML },
        { telefono: celdas[3].innerHTML },
        { telefono_emergencia: celdas[4].innerHTML }
      ];

      console.log(variablespaciente);

      seleccion = true;

    }

  });

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
            
        }

     
    });
}


var inputs = document.querySelector(".searchbarcont input");

const tabla = document.getElementById("tabla_datos");

tabla.addEventListener('click', function(event) {

  const target = event.target;
  event.stopPropagation();

  
  
  if (target.classList.contains('delete-button')) {

     
      const fila = target.closest('tr');
      const idElemento = fila.querySelector('.id');
     

      
      if (confirm('¿Estás seguro que quieres eliminar este registro?')) {
          
          
        fila.remove();
  
          
      } else {
      
      
      }
      
      
  }else if (target.classList.contains('edit-button')) {

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







