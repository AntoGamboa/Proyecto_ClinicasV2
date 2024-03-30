var pacienttablecont = document.querySelector(".pacientselectcont");
var pacientformcont = document.querySelector(".pacientform");
var formcont = document.querySelector(".pacientformcont");
const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".pacientform button");
let accionform= document.getElementById('accionFormulario');

const paginasform = document.querySelector(".formpages");



var seleccion = false;

var patologias = [];

var patologias_a_ingresar_enbd;



var funcion = "registrar_consulta"; //aqui se determina que funcion va a realizar el submit, registrar_paciente, registrar_consulta y modificar




//comprueba la sesion y te devuelve al menu si no es compatible

/*

const sesion = verificarSession();

if(sesion.permisos != 2){

  window.location.href = "http://localhost/Proyecto_ClinicasV2/vistas/menuprincipal.html"

}

*/



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

      reiniciarseleccion();
      patologias = [];
      paginasform.classList.add("paciente");

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
    paginasform.classList.toggle("patologia");
    

  }
  else if(paginasform.classList.contains("patologia")  && patologias.length > 0){


    paginasform.classList.toggle("patologia");
    paginasform.classList.toggle("detalles");

    

  }


}

//codigo para retroceder en las paginas del formulario

function retroceder(){

  if(paginasform.classList.contains("detalles")){

    paginasform.classList.toggle("detalles");
    paginasform.classList.toggle("patologia");
    

  }
  else if(paginasform.classList.contains("patologia")){

    paginasform.classList.toggle("patologia");
    paginasform.classList.toggle("paciente");
    cambiotabla();

    
    

  }


}








const tablaDatos = document.getElementsByTagName("tr");

for (let i = 0; i < tablaDatos.length; i++) {

  const fila = tablaDatos[i];
  const nombre = fila.querySelectorAll("td")[0];

  fila.addEventListener('click', function(event) {

    if(event.target.classList.contains("edit-button") || event.target.classList.contains("delete-button")){

      

        

    }else{

      if (fila.classList.contains("selected")) {

        fila.classList.remove("selected");
        seleccion = false;
  
      }else if(seleccion != true ) {
  
        variablespaciente = [];
  
        cambiotabla();
        avanzar();
  
        seleccion = true;
  
      }

      
    }

    

  });

}


//reinicia selecciones

function reiniciarseleccion(){
  patologiascont.forEach(patologia =>{

      if(patologia.classList.contains("selected")){
          patologia.classList.remove("selected");

      }

      patologias_a_ingresar_enbd = [];

  });
}



//este codigo inserta las patologias que se van a ingresar en la bd y las marca en la vista

const patologiascont = document.querySelectorAll(".patologiacont");

for (let i = 0; i < patologiascont.length; i++) {
  
    patologiascont[i].addEventListener('click', function(event) {

      

        if(patologiascont[i].classList.contains("selected")){

          patologiascont[i].classList.remove("selected");

          const borrar = patologias_a_ingresar_enbd.indexOf( patologiascont[i].innerHTML)

          if (borrar !== -1) {
            patologias_a_ingresar_enbd.splice(borrar, 1);
          }

        }else{

            patologiascont[i].classList.add("selected");
            patologias_a_ingresar_enbd.push(patologiascont[i].innerHTML);
            
            
        }
      
     
    });
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

const inputbusqueda = document.querySelector(".searchbarcont input");
const botonbusqueda = document.querySelector(".searchbarcont .buttonbuscar")

const inputbusquedapatologias = document.querySelector(".seleccionpatologiacont .inputcontespe .searchbarpatologias")
const botonbusquedapatologias = document.querySelector(".seleccionpatologiacont .inputcontespe .buttonbuscarpatologia")






botonbusqueda.addEventListener('click', ()=>{

  

    let busqueda = inputbusqueda.value;
    if(busqueda == ''){

      
        cargarTabla();
        

      }else{
        let busqueda = inputbusqueda.value;
        filtrartabla(busqueda);
        
  
      }

})





botonbusquedapatologias.addEventListener('click', ()=>{

  

    let busqueda = inputbusquedapatologias.value;
    if(busqueda == ''){
        patologias = [];
        cargarpatologias();
        

      }else{
        let busqueda = inputbusquedapatologias.textContent;
        filtrartablapatologias(busqueda);
        
  
      }

})









