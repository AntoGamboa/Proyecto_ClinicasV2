const tablecont = document.querySelector(".selectcont");
const formregistro = document.querySelector(".formregistrocont");
const formcont = document.querySelector(".formcont");
const form = document.querySelector(".formcont form");
const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".formregistrocont button")
let accionForm = document.getElementById('accionFormulario');

console.log(accionForm);

function cambiotabla(){

    if(tablecont.classList.contains("active")){

      //abrir form

        buttoncambio.innerHTML = "Cancelar";
        
        accionForm.value = 'create';

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");


    }
    else{

      //cerrar form
      
      buttoncambio.innerHTML = "Registrar";
      botonregistro.innerHTML = "Registrar"
      accionForm.value= 'create';
      form.reset();
      tablecont.classList.add("active");
        formregistro.classList.remove("active");
        formcont.classList.add("select");

    }
   
}

function cambiotablaeditar(variables){

    if(tablecont.classList.contains("active")){


      //abre form en modo editar
  
        buttoncambio.innerHTML = "Cancelar";

        accionForm.value= 'update';

        console.log(accionForm.value);

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");
  
      
        botonregistro.innerHTML = "Modificar"
      
     
      formcont.querySelector(".input_nombre").value = variables[1].innerHTML;
      formcont.querySelector(".input_id").value = variables[0].innerHTML;
  
    }
    else{


      
      buttoncambio.innerHTML = "Registrar";
      
      tablecont.classList.add("active");
      formcont.classList.remove("active");
      formcont.classList.add("registro");
      
      
  
    }
   
}


const tabla = document.getElementById("tabla_datos");

tabla.addEventListener('click', function(event) {
  const target = event.target; 
 if (target.classList.contains('edit-button')) {

    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");

    cambiotablaeditar(variables);
       
    }

});













