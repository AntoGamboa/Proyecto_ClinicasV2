var pacienttablecont = document.querySelector(".pacientselectcont");
var pacientformcont = document.querySelector(".pacientform");
var formcont = document.querySelector(".pacientformcont");

function cambiotabla(){

    if(pacienttablecont.classList.contains("active")){

        pacienttablecont.classList.remove("active");
        pacientformcont.classList.add("active");
        formcont.classList.remove("registro");

    }
    else{

        
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

    } else {

      fila.classList.add("selected");
      alert("Has seleccionado " + nombre.innerHTML);

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
            alert("Has seleccionado " + nombre);
        }

     
    });
}


var inputs = document.getElementsByTagName("input");

const tabla = document.getElementById("tabla_datos");

for (var i = 0; i < inputs.length; i++) {

inputs[i].addEventListener("input", function (event) {

  console.log(event.target.value);
  tabla.innerHTML ="";



});

}



