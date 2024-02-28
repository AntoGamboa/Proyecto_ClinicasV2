var pacienttablecont = document.querySelector(".pacientselectcont");
var pacientformcont = document.querySelector(".pacientform");
var formcont = document.querySelector(".pacientformcont");
const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".pacientform button")
let accionform= document.getElementById('accionFormulario');

var seleccion = false;

function cambiotabla(){

    if(pacienttablecont.classList.contains("active")){


      buttoncambio.innerHTML = "Cancelar"
      accionform.value='create';
      pacienttablecont.classList.remove("active");
      pacientformcont.classList.add("active");
      formcont.classList.remove("registro");


    }
    else{

      buttoncambio.innerHTML = "Registrar";
      
      pacienttablecont.classList.add("active");
      pacientformcont.classList.remove("active");
      pacientformcont.reset();
      formcont.classList.add("registro");

      botonregistro.innerHTML = "Registrar"

    }
   
}

function cambiotablaeditar(variables){

  if(pacienttablecont.classList.contains("active")){


    buttoncambio.innerHTML = "Cancelar"
    accionform.value='update';
    pacienttablecont.classList.remove("active");
    pacientformcont.classList.add("active");
    formcont.classList.remove("registro");

    
    botonregistro.innerHTML = "Modificar"
    
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







