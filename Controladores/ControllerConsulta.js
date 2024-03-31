let rutaPacientes='http://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php';
let rutaPatologia = 'http://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php';
let rutaMedicos = 'http://localhost/Proyecto_ClinicasV2/Modelos/Medico.php';
let rutaConsulta = 'http://localhost/Proyecto_ClinicasV2/Modelos/Consulta.php';

let templatePatologias=document.getElementById('templatepatologias').content;
let divPatologiaCont =document.querySelector('.patologiascont');
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');
let templateDataPac = document.getElementById('templateDatosPaciente').content;

let PatologiasSeleccionadas = [];
let EnviarFormulario = document.getElementById('formregistroconsulta');
let cedulaSeleccionada = '';
let cedulamedicoConsulta='';

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
    if(e.target.matches('.buttonbuscar'))
    {
        let cedulaBuscada = document.getElementById('cedulamedico').value;
        FindMedico(cedulaBuscada);
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
            clone.getElementById('trDatosPaciente').dataset.cedula=paciente.cedula;
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
        //asigna el evento sin comerse la asincronia
        asignareventosfilaspacientes();
        PatologiasSeleccionadas=[];
});}
const cargarPatologias = () => {
    let formdata = new FormData();
    formdata.append('accion','readAll');
    fetch(rutaPatologia,{
        method:'POST',
        body:formdata
    }).then(resp=>resp.json())
    .then(data=>{

        divPatologiaCont.textContent = '';
        data.forEach(item =>{
            patologias = data;
            let clone = templatePatologias.cloneNode(true);
            clone.getElementById('Patologia').textContent = item.nombre;
            clone.getElementById('Patologia').dataset.codigo = item.codigo;
            fragment.appendChild(clone);
        });
        divPatologiaCont.appendChild(fragment);

        asignareventospatologias();
    })
};
const FindMedico = cedulaBuscada =>{
    let formdata = new FormData();
    formdata.append('accion','find')
    formdata.append('cedulaBuscada',cedulaBuscada)
    fetch(rutaMedicos,{
        method:"POST",
        body:formdata
    }).then(resp => resp.json())
    .then(data =>{
        console.log(data);
        let nacimiento = new Date(data.nacimiento);
        let fechaActual = new Date();
        cedulamedicoConsulta=data.cedula;
        document.getElementById('cedulamedico').value=data.cedula;
        document.getElementById('nombreMedico').value=data.nombre;
        document.getElementById('apellidoMedico').value=data.apellido;
        document.getElementById('especialidad').value=data.especialidad;
        document.getElementById('edadMedico').value=`${fechaActual.getFullYear()-nacimiento.getFullYear()}`;
        cedulamedicoConsulta=data.cedula;
    })
};

const filtrarTabla = (busqueda)=>{
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


            if(paciente.cedula.contains(busqueda)){

            
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
                clone.getElementById('trDatosPaciente').dataset.cedula=paciente.cedula;
                fragment.appendChild(clone);

            }
        });
        tabla_datos.appendChild(fragment);
        //asigna el evento sin comerse la asincronia
        asignareventosfilaspacientes();
        PatologiasSeleccionadas=[];
});}



const filtrartablapatologias = (busqueda)=>{

    divPatologiaCont.textContent = '';

    

    patologias.forEach( pato =>{


        if(pato.nombre.includes(busqueda)){

            let clone = templatePatologias.cloneNode(true);
            clone.getElementById('Patologia').textContent = pato.nombre;
            clone.getElementById('Patologia').dataset.codigo = pato.codigo;
            fragment.appendChild(clone);

        }
        
    });
    divPatologiaCont.appendChild(fragment);

    asignareventospatologias();
};

EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    let formdata = new FormData(EnviarFormulario);
    formdata.append('patologias',JSON.stringify(PatologiasSeleccionadas));
    formdata.append('cedulaPaciente',CedulaPAciSelec);
    formdata.append('cedulaMedico',cedulamedicoConsulta);
    formdata.append('accion','create')
    if(formdata.get('accion') === 'create'){        
        fetch(rutaConsulta,{
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

