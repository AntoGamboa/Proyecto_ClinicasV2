const tablecont = document.querySelector(".selectcont");
const formregistro = document.querySelector(".formregistrocont");
const formcont = document.querySelector(".formcont");

function cambiotabla(){

    if(tablecont.classList.contains("active")){

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");

    }
    else{

        
        tablecont.classList.add("active");
        formregistro.classList.remove("active");
        formcont.classList.add("select");

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

