let formPaciente = document.getElementById('formPaciente');
let template = document.getElementById('templateDatosPaciente');
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');
let rutaPaciente ='https://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php';
let cedulaSeleccionada = '';

document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData();
            formdata.append('accion','eliminar')
            formdata.append('cedula',e.target.dataset.cedula)
            fetch(rutaPaciente,{
                method: 'POST',
                body: formdata
            }).then(resp => resp.json())
            .then(data => {alert(data.mensaje) 
                cargarTabla();
            })
        
        }
    }
}); 


document.addEventListener('DOMContentLoaded',e =>{
    cargarTabla();
});

formPaciente.addEventListener('submit', e =>{
    e.preventDefault();
    let formdata = new FormData(formPaciente);
    if(formdata.get('accion') === 'create'){        
        fetch(rutaPaciente,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data =>{ 
            alert(data.mensaje)
            cargarTabla();
            cambiotabla();
        });
    }
    else if(formdata.get('accion') === 'update')
    {
        formdata.append('cedulaSeleccionada',cedulaSeleccionada)
        fetch(rutaPaciente,{
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

const cargarTabla = ()=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaPaciente,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(paciente => {
            let clone = template.cloneNode(true);
            clone.getElementById('cedula').textContent = paciente.cedula;
            clone.getElementById('nombre').textContent = paciente.nombre;
            clone.getElementById('apellido').textContent = paciente.apellido;
            clone.getElementById('telefono').textContent = paciente.telefono;
            clone.getElementById('telefonoEmergencia').textContent = paciente.telefonoEmergencia;

            clone.querySelector('.delete-button').dataset.cedula = paciente.cedula;
            clone.querySelector('.edit-button').dataset.cedula = paciente.cedula;
           
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
    })
 };