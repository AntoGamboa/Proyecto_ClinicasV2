const tablecont = document.querySelector(".selectcont"); //tabla linea 36
const formregistro = document.querySelector(".formregistrocont");
const formModificar = document.querySelector(".formModificarCont");
const formcont = document.querySelector(".formcont");
const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".formregistrocont button")

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

function cambiotablaeditar(variables){

    if(tablecont.classList.contains("active")){
  
        tablecont.classList.remove("active");
        formModificar.classList.add("active");
        formcont.classList.remove("select");
        
      
      formcont.querySelector(".input_nombre").value = variables[0].innerHTML;
  
    }
    else{
      
      tablecont.classList.add("active");
      formcont.classList.remove("active");
      formcont.classList.add("registro");
      
      
  
    }
   
}

var inputs = document.querySelector("input");

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