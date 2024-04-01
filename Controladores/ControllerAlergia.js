let EnviarFormulario = document.getElementById('formregistroAlergia');
let template = document.getElementById('templateDatosAlergias').content;
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');


let rutaAlergia = 'http://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php';

let idSeleccionado = '';

let alergias = [];

document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData();
            formdata.append('accion','delete')
            formdata.append('id',e.target.dataset.codigo)
            fetch(rutaAlergia,{
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
        idSeleccionado=e.target.dataset.codigo;
    }
}); 

document.addEventListener('DOMContentLoaded',e =>{
    cargarTabla();
    crearbotonesnav();
});

console.log(EnviarFormulario);
EnviarFormulario.addEventListener('submit',e => {
    let formdata = new FormData(EnviarFormulario);
    e.preventDefault();

    if (!(formdata.get('idAlergia') && formdata.get('idAlergia').length >= 2 && formdata.get('idAlergia').length <= 5 && /\d.*\d/.test(formdata.get('idAlergia')) && /^[a-zA-Z0-9]+$/.test(formdata.get('idAlergia')))) {

        generarmensaje("alerta", "El codigo debe tener minimo 2 numeros y maximo 5, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('nombre') && formdata.get('nombre').length >= 2 && /^[a-zA-Z]+$/.test(formdata.get('nombre')))) {

        generarmensaje("alerta", "El nombre de la Alergia solo debe contener letras y debe tener minimo 2 caracteres, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    
    if(formdata.get('accion') === 'create'){        
        fetch(rutaAlergia,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data =>{ 
            alert(data.mensaje)
            cargarTabla();
            cambioTabla();
        });
    }
    else if(formdata.get('accion') === 'update')
    {
        formdata.append('idSeleccionado',idSeleccionado)
        fetch(rutaAlergia,{
            method:'POST',
            body:formdata
        })
        .then(resp => resp.json())
        .then(data => {
            alert(data.mensaje)
            cargarTabla();
            cambioTabla();
        })   
    }
});

const cargarTabla = ()=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch(rutaAlergia,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        alergias = data;

        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(alergia => {
            let clone = template.cloneNode(true);
            clone.getElementById('id').textContent = alergia.codigo;
            clone.getElementById('nombre').textContent = alergia.nombre;
            clone.querySelector('.delete-button').dataset.codigo = alergia.codigo;
            clone.querySelector('.edit-button').dataset.codigo = alergia.codigo;
           
            fragment.appendChild(clone);
        });

        tabla_datos.appendChild(fragment);

    })
};

const filtrartabla =(busqueda)=>{

    
    tabla_datos.textContent = '';
    alergias.forEach(alergia => {

        if(alergia.nombre.toLowerCase().includes(busqueda.toLowerCase())){

            let clone = template.cloneNode(true);
            clone.getElementById('id').textContent = alergia.codigo;
            clone.getElementById('nombre').textContent = alergia.nombre;
            clone.querySelector('.delete-button').dataset.codigo = alergia.codigo;
            clone.querySelector('.edit-button').dataset.codigo = alergia.codigo;
            
            fragment.appendChild(clone);
        }
        
    });

    tabla_datos.appendChild(fragment);


};


const inputs = document.querySelector(".searchbarcont input");
const botonbusqueda = document.querySelector(".searchbarcont button")


botonbusqueda.addEventListener('click', ()=>{

    

    let busqueda = inputs.value;

    if(busqueda == ''){
      alergias = [];
      cargarTabla();
    }else{
      
      filtrartabla(busqueda);

    }
});