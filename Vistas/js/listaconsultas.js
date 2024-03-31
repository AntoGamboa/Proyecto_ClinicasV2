
const formcont = document.querySelector(".formcont");

const tablecont = document.querySelector(".selectcont");

const formregistro = document.querySelector(".formregistrocont");

const tabla = document.getElementById("tabla_datos");





tabla.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button')) {
    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");
    cambiotablaeditar(variables);}

});


//evento para abrir historia

const tablaDatos = document.getElementsByTagName("tr");

for (let i = 0; i < tablaDatos.length; i++) {

  const fila = tablaDatos[i];
  

  fila.addEventListener('click', function(event) {

    //no permite que se dispare el evento si se clickea editar o eliminar

    if(event.target.classList.contains('edit-button') || event.target.classList.contains('delete-button')){


    }
    else{

        //crea el evento que abre el pdf aqui hermanosky

       

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


//eventos para filtrar


const inputbusqueda = document.querySelector(".searchbarcont input");
const botonbusqueda = document.querySelector(".searchbarcont button");

inputbusqueda.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    
    event.preventDefault(); 

    let busqueda = inputbusqueda.value;
    if(busqueda == ''){

      
        
        cargarTabla();
      }else{
        
        buscarTabla(busqueda);

        
  
      }
  }
});




botonbusqueda.addEventListener('click', ()=>{

    let busqueda = inputbusqueda.value;
    if(busqueda == ''){

      
        
        cargarTabla();
      }else{
        
        buscarTabla(busqueda);

        
  
      }

})