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



const tablaDatos = document.getElementById('tabla_datos');

tablaDatos.addEventListener('click', function(event) {

    const target = event.target;

    const fila = target.closest('tr');
    
    const nombreElemento = fila.querySelector('.nombre');
    var inputnombre = document.getElementById('nombre');
    inputnombre.value = nombreElemento.textContent;

});
