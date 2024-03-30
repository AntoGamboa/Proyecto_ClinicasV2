let rutaPacientes='http://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php';
const rutaPatologia= 'http://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php';


let templatePatologias=document.getElementById('templatepatologias').content;
let divPatologiaCont =document.querySelector('.patologiascont');
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');
let templateDataPac = document.getElementById('templateDatosPaciente').content;

let PatologiasSeleccionadas = [];


let cedulaSeleccionada = '';


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
    if(e.target.matches('.patologiacont'))
    {
        let resultado = PatologiasSeleccionadas.find(item => item == e.target.dataset.codigo );
        if(resultado !== undefined)
        {
            PatologiasSeleccionadas = PatologiasSeleccionadas.filter(item => item !== resultado);
        }else
        {
            PatologiasSeleccionadas.push(e.target.dataset.codigo);
        }



        console.log(PatologiasSeleccionadas);
        console.log(cedulaSeleccionada);
    }
});


document.addEventListener('DOMContentLoaded',e =>{
    cargarTabla()
   cargarPatologias()
});


const cargarTabla = ()=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaPacientes,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {
        tabla_datos.textContent = '';
        data.forEach(paciente => {
            let clone = templateDataPac.cloneNode(true);
            let nacimiento = new Date(paciente.nacimiento) ;
            let fechaActual = new Date();
            clone.getElementById('cedula').textContent = paciente.cedula;
            clone.getElementById('nombre').textContent = paciente.nombre;
            clone.getElementById('apellido').textContent = paciente.apellido;
            clone.getElementById('edad').textContent = `${fechaActual.getFullYear()-nacimiento.getFullYear()} años`;
            clone.getElementById('alergias').textContent = paciente.alergias;
            clone.querySelector('.delete-button').dataset.cedula = paciente.cedula;
            clone.querySelector('.edit-button').dataset.cedula = paciente.cedula;
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);

        //asigna el evento sin comerse la asincronia
        asignareventosfilaspacientes();

        
});}
const cargarPatologias = () => {
    let formdata = new FormData();
    formdata.append('accion','readAll');
    fetch(rutaPatologia,{
        method:'POST',
        body:formdata
    }).then(resp=>resp.json())
    .then(data=>{
        data.forEach(item =>{
            let clone = templatePatologias.cloneNode(true);
            clone.getElementById('Patologia').textContent = item.nombre;
            clone.getElementById('Patologia').dataset.codigo = item.codigo;
            fragment.appendChild(clone);
        });
        divPatologiaCont.appendChild(fragment);
    })
};


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

            if(medico.nombre === busqueda){
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

EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    let formdata = new FormData(EnviarFormulario);
    if(formdata.get('accion') === 'create'){        
        fetch(ruta,{
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





tabla.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button')) {
    const fila = target.closest('tr');
    var variables = fila.querySelectorAll("td");
    cambiotablaeditar(variables);}

});

