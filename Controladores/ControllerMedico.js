/*Variables con las rutas para las promesas Fetch */
let rutaMedicos='http://localhost/Proyecto_ClinicasV2/Modelos/Medico.php';
let rutaEspecialidades = 'http://localhost/Proyecto_ClinicasV2/Modelos/Especialidad.php';

/*Formulario de registro de medicos */
let EnviarFormulario = document.getElementById('formregistromedico');

/*Para cargar los medicos registrado en la tabla */
let template = document.getElementById('templatedatosmedicos').content;
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');

/*Variables donde se trabaja la parte especialidad */
let FormEspecialidades = document.getElementById('SeleccionarEspecialiad');
let TemplateDivEspecialidad = document.getElementById('TemplateDivEspecialidad').content;
let DivContEspecialidades = document.querySelector('.especialidadescont');
/* Para saber la cedula del medico que se ah seleccionado y el array de las especialidades escogidas*/
let cedulaSeleccionada = '';
let EspecialidadEscogidaForm=[];

EnviarFormulario.addEventListener('submit',e => {
    
    e.preventDefault();

    let EnviarFormulario = document.getElementById('formregistromedico');

    let formdata = new FormData(EnviarFormulario);

    if (!(formdata.get('cedula') && formdata.get('cedula').length == 8 && /^[0-9]+$/.test(formdata.get('cedula')))) {

        generarmensaje("alerta", "La cedula debe tener un formato valido, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('nombre') && formdata.get('nombre').length >= 1 && /^[a-zA-Z\s]+$/i.test(formdata.get('nombre')))) {
        generarmensaje("alerta", "El nombre solo puede tener letras y espacios, además no puede tener caracteres especiales (*-_/@)");
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


    if(formdata.get('accion') === 'create'){  
        formdata.append('especialidades',JSON.stringify(EspecialidadEscogidaForm))      
        fetch(rutaMedicos,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data =>{ 
            console.log(data.mensaje);
            cargarTabla();
            cambiotabla();
            EspecialidadEscogidaForm=[];
        });
    }
    else if(formdata.get('accion')=== 'update')
    {
        formdata.append('cedulaSeleccionada',cedulaSeleccionada)
        formdata.append('especialidades',JSON.stringify(EspecialidadEscogidaForm))
        fetch(rutaMedicos,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data => {
            alert(data.mensaje)
            cargarTabla();
            cambiotabla();
        })   
    }
});

document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData()
            formdata.append('accion','eliminar')
            formdata.append('cedula',e.target.dataset.cedula)
            fetch(rutaMedicos,{
                method: 'POST',
                body: formdata
            }).then(resp => resp.json())
            .then(data => {alert(data.mensaje)  
                cargarTabla();
                
            })
        }
    }
    if(e.target.matches('.edit-button'))
    {
        cedulaSeleccionada=e.target.dataset.cedula;
        espMedSelect();
        let datedad = document.getElementById('inputnacimiento');
        let nacimiento = new Date(e.target.dataset.nacimiento);
        console.log(nacimiento)
        datedad.value = nacimiento.toISOString().slice(0,10);
    }
    if(e.target.matches('.especialidadcont'))
    {
        let resultado = EspecialidadEscogidaForm.find(item => item == e.target.dataset.codigo );
        if(resultado !== undefined)
        {
            EspecialidadEscogidaForm = EspecialidadEscogidaForm.filter(item => item !== resultado);
        }else
        {
            EspecialidadEscogidaForm.push(e.target.dataset.codigo);
        }
        console.log(EspecialidadEscogidaForm);       
    }
    if(e.target.dataset.estado === "Cancelar")
    {
        EspecialidadEscogidaForm=[];
    }
});




/* cargar datos al estar lista la pagina*/
document.addEventListener('DOMContentLoaded',e =>{
    cargarTabla()
    cargarEspecialidades()
});


/* Funciones de ayuda*/
const cargarTabla = ()=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaMedicos,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        

        tabla_datos.textContent = '';
        data.forEach(medico => {
            let clone = template.cloneNode(true);
            let nacimiento = new Date(medico.nacimiento) ;
            let fechaActual = new Date();
            clone.getElementById('cedula').textContent = medico.cedula;
            clone.getElementById('nombre').textContent = medico.nombre;
            clone.getElementById('apellido').textContent = medico.apellido;
            clone.getElementById('especialidad').textContent=medico.especialidad;
            clone.getElementById('nacimiento').textContent =`${fechaActual.getFullYear()-nacimiento.getFullYear()} años`;
            clone.querySelector('.delete-button').dataset.cedula = medico.cedula;
            clone.querySelector('.edit-button').dataset.cedula = medico.cedula;
            clone.querySelector('.edit-button').dataset.nacimiento = medico.nacimiento;
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
    });
}

const filtrartabla = (busqueda)=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaMedicos,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {
        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(medico => {

            if(medico.cedula.includes(busqueda)){
                let clone = template.cloneNode(true);
                clone.getElementById('cedula').textContent = medico.cedula;
                clone.getElementById('nombre').textContent = medico.nombre;
                clone.getElementById('apellido').textContent = medico.apellido;
                clone.querySelector('.delete-button').dataset.cedula = medico.cedula;
                clone.querySelector('.edit-button').dataset.cedula = medico.cedula;
                fragment.appendChild(clone);
            }
            
        });
        tabla_datos.appendChild(fragment);
});}




const cargarEspecialidades = () =>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaEspecialidades,{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)

        especialidadesbasededatos = data;

        DivContEspecialidades.textContent = '';

        data.forEach(item =>{
            let clone = TemplateDivEspecialidad.cloneNode(true);
            clone.querySelector('.especialidadcont').textContent = item.nombre;
            clone.querySelector('.especialidadcont').dataset.codigo = item.codigo;
            fragment.appendChild(clone);
        });
        DivContEspecialidades.appendChild(fragment);

        asignareventosespecilidades();

    });
        
};


const filtrartablaspecialidades = (busqueda) =>{

    DivContEspecialidades.textContent = '';

    especialidadesbasededatos.forEach(especialidad =>{



        if(especialidad.nombre.toLowerCase().includes(busqueda.toLowerCase())){

            

            let clone = TemplateDivEspecialidad.cloneNode(true);
            clone.querySelector('.especialidadcont').textContent = especialidad.nombre;
            clone.querySelector('.especialidadcont').dataset.codigo = especialidad.codigo;
            fragment.appendChild(clone);

        }
    });
    DivContEspecialidades.appendChild(fragment);

    asignareventosespecilidades();
        
};

const espMedSelect = () =>{
    let formdata = new FormData();
    formdata.append('accion','readEspMedSelect')
    formdata.append('cedulaSeleccionada',cedulaSeleccionada)
    fetch(rutaMedicos,{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data =>{
        EspecialidadEscogidaForm = [];
        data.forEach(item =>{
            EspecialidadEscogidaForm.push(item.codigo)
        });
        console.log(EspecialidadEscogidaForm);
    });

};
