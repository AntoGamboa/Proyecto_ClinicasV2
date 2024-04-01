
let rutaPaciente ='http://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php';
let rutaAlergia = 'http://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php';

let formPaciente = document.getElementById('formPaciente');
let divAlergias = document.querySelector('.alergiascont');

let templateDatosPaciente = document.getElementById('templateDatosPaciente').content;
let templateAlergias = document.getElementById('templateAlergias').content;


let fragment = document.createDocumentFragment();

let alergiaEscogidaForm = [];
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
    if(e.target.matches('.edit-button'))
    {
        cedulaSeleccionada=e.target.dataset.cedula;
        AlerPaciteUpdate();
        let datedad = document.getElementById('inputnacimiento');
        let nacimiento = new Date(e.target.dataset.nacimiento);
        console.log(nacimiento)
        datedad.value = nacimiento.toISOString().slice(0,10);

    }
    if(e.target.matches('.alergiacont'))
    {
        let resultado = alergiaEscogidaForm.find(item => item == e.target.dataset.codigo );
        if(resultado !== undefined)
        {
            alergiaEscogidaForm = alergiaEscogidaForm.filter(item => item !== resultado);
        }else
        {
            alergiaEscogidaForm.push(e.target.dataset.codigo);
        }
        console.log(alergiaEscogidaForm);    
    }
    if(e.target.dataset.estado === "Cancelar")
    {
        alergiaEscogidaForm=[];
    }
}); 


document.addEventListener('DOMContentLoaded',e =>{

    
    cargarTabla();
    cargarAlergias();
});

formPaciente.addEventListener('submit', e =>{

    e.preventDefault();
    
    //obtenemos los datos del formulario del paciente

    const datosformpaciente = document.getElementById("datosformPaciente");
    let formdata = new FormData(datosformpaciente);

    //validaciones

    
    if (!(formdata.get('cedula') && formdata.get('cedula').length == 8 && /^[0-9]+$/.test(formdata.get('cedula')))) {

        generarmensaje("alerta", "La cedula debe tener un formato valido, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('nombre') && formdata.get('nombre').length >= 1   && /^[a-zA-Z]+$/.test(formdata.get('nombre')))) {

        generarmensaje("alerta", "El nombre solo puede tener letras, ademas no puede tener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('apellido') && formdata.get('apellido').length >= 1   && /^[a-zA-Z]+$/.test(formdata.get('apellido')))) {

        generarmensaje("alerta", "El apellido solo puede tener letras, ademas no puede tener caracteres especiales (*-_/@)")
        return;

    }

    var fechaNacimiento = new Date(formdata.get('nacimiento'));

    if (!(formdata.get('nacimiento') && new Date() > fechaNacimiento)) {

        generarmensaje("alerta", "La fecha de nacimiento no puede ser superior a la fecha actual");
        return;
    }
    if (!(formdata.get('telefono') &&  formdata.get('telefono').length == 11   && /^[0-9]+$/.test(formdata.get('telefono')))) {

        generarmensaje("alerta", "El telefono debe tener un formato valido, ejemplo 04245158962")
        return;

    }
    if (!(formdata.get('telefonoemergencia') && formdata.get('telefonoemergencia').length == 11   && /^[0-9]+$/.test(formdata.get('telefonoemergencia')))) {

        generarmensaje("alerta", "El telefono de emergencia debe tener un formato valido, ejemplo 04245158962")
        return;

    }

    //fin validaciones


    if(formdata.get('accion') === 'create'){        
        formdata.append('alergias',JSON.stringify(alergiaEscogidaForm));
        fetch(rutaPaciente,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data =>{ 
            alert(data.mensaje)
            cargarTabla();
            cambiotabla();
            alergiaEscogidaForm=[];
            
        });
    }
    else if(formdata.get('accion') === 'update')
    {
        formdata.append('cedulaSeleccionada',cedulaSeleccionada)
        formdata.append('alergias',JSON.stringify(alergiaEscogidaForm))
        fetch(rutaPaciente,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data => {
            alert(data.mensaje)
            cargarTabla();
            cambiotabla();
            alergiaEscogidaForm=[];
        })   
    }
});



const cargarAlergias = () =>{
    let formdata = new FormData();
    formdata.append('accion','readAll')
    fetch(rutaAlergia,{
        method:'POST',
        body:formdata
    }).then(resp => resp.json())
    .then(data=>{

        alergias = data;
       

        divAlergias.textContent = '';

        data.forEach( aler =>{
            let clone = templateAlergias.cloneNode(true);
            clone.querySelector('.alergiacont').textContent = aler.nombre;
            clone.querySelector('.alergiacont').dataset.codigo = aler.codigo;
            fragment.appendChild(clone);
        });
        divAlergias.appendChild(fragment);

        asignareventosalergias();
    })
};

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

        let dataTableBody = document.getElementById('tabla_datos');
        
        dataTableBody.textContent = '';
        data.forEach(paciente => {
            let nacimiento = new Date(paciente.nacimiento);
            let currDate = new Date();
            let clone = templateDatosPaciente.cloneNode(true);
            clone.getElementById('cedula').textContent = paciente.cedula;
            clone.getElementById('nombre').textContent = paciente.nombre;
            clone.getElementById('apellido').textContent = paciente.apellido;
            clone.getElementById('edad').textContent = `${currDate.getFullYear() - nacimiento.getFullYear()} años`;
            clone.getElementById('telefono').textContent = paciente.telefono;
            clone.getElementById('telefonoEmergencia').textContent = paciente.telefonoE;
            clone.getElementById('alergias').textContent=paciente.alergias;
            clone.querySelector('.delete-button').dataset.cedula = paciente.cedula;
            clone.querySelector('.edit-button').dataset.cedula = paciente.cedula;
            clone.querySelector('.edit-button').dataset.nacimiento = paciente.nacimiento;

           
            fragment.appendChild(clone);
        });
        dataTableBody.appendChild(fragment);
    })
 };
const AlerPaciteUpdate = ()=>{
    let formdata = new FormData();
    formdata.append('accion','readAlerpaciente');
    formdata.append('cedulaSeleccionada',cedulaSeleccionada);
    fetch(rutaPaciente,{
        method:'POST',
        body:formdata
    }).then(resp=>resp.json())
    .then(data =>{
       data.forEach(item =>{
            alergiaEscogidaForm.push(item.idAlergia);
       })
        console.log(alergiaEscogidaForm);
    })
};

const filtrarTabla = (busqueda)=>{

    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaPaciente,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        let dataTableBody = document.getElementById('tabla_datos');
        dataTableBody.textContent = '';
        data.forEach(paciente => {

            if(paciente.cedula.includes(busqueda)){

                let clone = templateDatosPaciente.cloneNode(true);
                clone.getElementById('cedula').textContent = paciente.cedula;
                clone.getElementById('nombre').textContent = paciente.nombre;
                clone.getElementById('apellido').textContent = paciente.apellido;
                clone.getElementById('telefono').textContent = paciente.telefono;
                clone.getElementById('telefonoEmergencia').textContent = paciente.telefonoEmergencia;

                clone.querySelector('.delete-button').dataset.cedula = paciente.cedula;
                clone.querySelector('.edit-button').dataset.cedula = paciente.cedula;
                
                fragment.appendChild(clone);
            }
            
        });
        dataTableBody.appendChild(fragment);
    })
};


const filtrartablaalergias = (busqueda)=>{

    divAlergias.textContent = '';

    

    alergias.forEach( aler =>{


        if(aler.nombre.toLowerCase().includes(busqueda.toLowerCase())){

            let clone = templateAlergias.cloneNode(true);
            clone.querySelector('.alergiacont').textContent = aler.nombre;
            clone.querySelector('.alergiacont').dataset.codigo = aler.codigo;
            fragment.appendChild(clone);

        }
        
    });
    divAlergias.appendChild(fragment);

    asignareventosalergias();
};
