
const formcont = document.querySelector(".formcont");

const tablecont = document.querySelector(".selectcont");

const formregistro = document.querySelector(".formregistrocont");

const tabla = document.getElementById("tabla_datos");

const overlaydetalles = document.querySelector(".detallescont");

const cerrardetalles = document.querySelector(".detallescont ion-icon");


//cerrar detalles

cerrardetalles.addEventListener('click', ()=>{

    overlaydetalles.classList.toggle("activo")

})

tabla.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button')) {
    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");
    cambiotablaeditar(variables);}

});


//evento para abrir detalles

const tablaDatos = document.getElementsByTagName("tr");

for (let i = 0; i < tablaDatos.length; i++) {

  const fila = tablaDatos[i];
  const nombre = fila.querySelectorAll("td")[0];

  fila.addEventListener('click', function(event) {

    //no permite que se dispare el evento si se clickea editar o eliminar

    if(event.target.classList.contains('edit-button') || event.target.classList.contains('delete-button')){


    }
    else{

        //agregar datos

       overlaydetalles.classList.toggle("activo");

    }


  });

}



function cambiotabla(){

    if(tablecont.classList.contains("active")){

      //abrir form

        
        
        


    }
    else{

      //cerrar form
      
      
      
      tablecont.classList.add("active");
        formregistro.classList.remove("active");
        formcont.classList.add("select");

    }
   
}




function cambiotablaeditar(variables){

    //abrir editar

    if(tablecont.classList.contains("active")){
  
        

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");
        formcont.querySelector(".input_nombre").value = variables[1].innerHTML;
        formcont.querySelector(".input_apellidomedico").value = variables[2].innerHTML;
        formcont.querySelector(".input_cedulamedico").value = variables[0].innerHTML;
  
    }
    else{
      
      
      
      
  
    }
   
}


const inputs = document.querySelector(".searchbarcont input");
const botonbusqueda = document.querySelector(".searchbarcont button");






/*botonbusqueda.addEventListener('click', ()=>{

    let busqueda = inputs.textContent;
    if(busqueda == ''){
        
        cargarTabla();
      }else{
        let busqueda = inputs.textContent;
        filtrartabla(busqueda);
  
      }

}) */