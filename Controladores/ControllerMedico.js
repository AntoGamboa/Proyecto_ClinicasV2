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
    let formdata = new FormData(EnviarFormulario);
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
});


document.addEventListener('DOMContentLoaded',e =>{
    cargarTabla()
    cargarEspecialidades()
});
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
        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(medico => {
            let clone = template.cloneNode(true);
            clone.getElementById('cedula').textContent = medico.cedula;
            clone.getElementById('nombre').textContent = medico.nombre;
            clone.getElementById('apellido').textContent = medico.apellido;
            clone.getElementById('especialidad').textContent=medico.especialidad;
            clone.querySelector('.delete-button').dataset.cedula = medico.cedula;
            clone.querySelector('.edit-button').dataset.cedula = medico.cedula;

            fragment.appendChild(clone);
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
            data.forEach(item =>{
                let clone = TemplateDivEspecialidad.cloneNode(true);
                clone.querySelector('.especialidadcont').textContent = item.nombre;
                clone.querySelector('.especialidadcont').dataset.codigo = item.codigo;
                fragment.appendChild(clone);
            });
            DivContEspecialidades.appendChild(fragment);

        });
            
    };
