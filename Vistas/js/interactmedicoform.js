const seleccioncont = document.querySelector(".seleccionespecialidadcont");

const buttoncambio = document.querySelector(".buttonregister");

const botonregistro = document.querySelector(".formregistrocont .btnRegistrar")

const botoneditar = document.querySelector(".formregistrocont .btneditar")

const formcont = document.querySelector(".formcont");

const tablecont = document.querySelector(".selectcont");
const formregistro = document.querySelector(".formregistrocont");

const formMedicoregistro = document.querySelector(".formmedicocont");

const tabla = document.getElementById("tabla_datos");

let accionForm = document.getElementById('accionFormulario');


var especialidades = []; //aqui van las especialidades por medico que se van a enviar o modificar


var especialidadesbasededatos //aqui van las que se extraen de la base de datos


/*

const sesion = verificarSession();

if(sesion.permisos != 1){

    window.location.href = "http://localhost/Proyecto_ClinicasV2/vistas/menuprincipal.html"
  
}

*/



function cambiotabla(){

    //abrir form

    if(tablecont.classList.contains("active")){

        buttoncambio.innerHTML = "Cancelar";
        buttoncambio.dataset.estado = "";
        accionForm.value = 'create';
        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");
        formMedicoregistro.classList.add("active");
    }
    else{

    //cerrar form
      
        buttoncambio.innerHTML = "Registrar";
        buttoncambio.dataset.estado = "Cancelar";
        tablecont.classList.add("active");
        formregistro.classList.remove("active");
        formcont.classList.add("select");
        formregistro.reset();
        botoneditar.style.display = 'none';
        botonregistro.style.display = 'flex';

        formMedicoregistro.classList.remove("active");
        seleccioncont.classList.remove("active");
        
        reiniciarseleccion();

        especialidades = [];

        

    }
   
}



function abrirespecialidades(){

    //validaciones

    let EnviarFormulario = document.getElementById('formregistromedico');

    let formdata = new FormData(EnviarFormulario);

    if (!(formdata.get('cedula') && formdata.get('cedula').length == 8 && /^[0-9\s]+$/.test(formdata.get('cedula')))) {

        generarmensaje("alerta", "La cedula debe tener un formato valido, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('nombre') && formdata.get('nombre').length >= 1   && /^[a-zA-Z\s]+$/.test(formdata.get('nombre')))) {

        generarmensaje("alerta", "El nombre solo puede tener letras, ademas no puede tener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('apellido') && formdata.get('apellido').length >= 1   && /^[a-zA-Z\s]+$/.test(formdata.get('apellido')))) {

        generarmensaje("alerta", "El apellido solo puede tener letras, ademas no puede tener caracteres especiales (*-_/@)")
        return;

    }

    var fechaNacimiento = new Date(formdata.get('nacimiento'));

    if (!(formdata.get('nacimiento') && new Date() > fechaNacimiento)) {

        generarmensaje("alerta", "La fecha de nacimiento no puede ser superior a la fecha actual");
        return;
    }
    
    if(seleccioncont.classList.contains("active")){
        

        seleccioncont.classList.remove("active");
        confirmarcont.classList.add("active");
    }
    else if (formMedicoregistro.classList.contains("active")){

        seleccioncont.classList.add("active");
        formMedicoregistro.classList.remove("active");

    }

}

function cerrarrespecialidades(){

    


    if(seleccioncont.classList.contains("active")){
        
        formMedicoregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formMedicoregistro.classList.remove("active");
        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");

    }
    

}


function cambiotablaeditar(variables){

    //abrir editar

    if(tablecont.classList.contains("active")){
  
        buttoncambio.innerHTML = "Cancelar";

        tablecont.classList.remove("active");
        formregistro.classList.add("active");
        formcont.classList.remove("select");
        formMedicoregistro.classList.add("active");
        botoneditar.style.display = 'flex';
        botonregistro.style.display = 'none';
        accionForm.value = 'update';
        formcont.querySelector(".input_nombremedico").value = variables[1].innerHTML;
        formcont.querySelector(".input_apellidomedico").value = variables[2].innerHTML;
        formcont.querySelector(".input_cedulamedico").value = variables[0].innerHTML;
  
    }
    else{
      
      
      
      
  
    }
   
}





var inputs = document.querySelector("input");



tabla.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button')) {
    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");
    cambiotablaeditar(variables);}

});




//reinicia selecciones

function reiniciarseleccion(){
    const especialidadescont = document.querySelectorAll(".especialidadcont");

    especialidadescont.forEach(especialidad =>{

        if(especialidad.classList.contains("selected")){
            especialidad.classList.remove("selected");
        }

    });

    EspecialidadEscogidaForm = [];
}

function asignarseleccion(){
    const especialidadescont = document.querySelectorAll(".especialidadcont");

    especialidadescont.forEach(especialidad =>{

        if(especialidad.classList.contains("selected")){
            especialidad.classList.remove("selected");
        }

    });

    EspecialidadEscogidaForm = [];
}


function asignareventosespecilidades(){

    const especialidadescont = document.querySelectorAll(".especialidadcont");

    

        for (let i = 0; i < especialidadescont.length; i++) {

            especialidadescont[i].addEventListener('click', function(event) {

                if(especialidadescont[i].classList.contains("selected")){

                    especialidadescont[i].classList.remove("selected");

                    
                }else{

                    especialidadescont[i].classList.add("selected");
                    
                    
                    
                }

                
            });
        }
}



const inputSearch = document.querySelector(".searchbarcont .searchbar");
const botonbusqueda = document.querySelector(".searchbarcont button");

const inputSearchespecialidades = document.querySelector(".seleccionespecialidadcont .inputcontespe .searchbarespecialidades");
const botonbusquedaespecialidades = document.querySelector(".seleccionespecialidadcont .inputcontespe .buttonbuscarespecialidades")






botonbusqueda.addEventListener('click', ()=>{


    var busqueda = inputSearch.value;

    
    if(busqueda == ''){
        cargarTabla();
      }else{
        
        filtrartabla(busqueda);
  
      }

})





botonbusquedaespecialidades.addEventListener('click', ()=>{

    

    let busqueda = inputSearchespecialidades.value;

    
    if(busqueda == ''){

        especialidadesbasededatos = [];
        cargarEspecialidades();

      }else{

        
        filtrartablaspecialidades(busqueda);
  
      }

})

