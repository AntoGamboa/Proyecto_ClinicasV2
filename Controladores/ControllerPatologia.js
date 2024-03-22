const EnviarFormulario = document.getElementById('formregistro');
const template = document.getElementById('templateDatosPatologia').content;
const fragment = document.createDocumentFragment();
const tabla_datos = document.getElementById('tabla_datos');
const rutaPatologia= 'http://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php';
let idSeleccionado = '';


document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData();
            formdata.append('accion','eliminar')
            formdata.append('idPatologia',e.target.dataset.codigo)
            fetch(rutaPatologia,{
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
});

console.log(EnviarFormulario);
EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    let formdata = new FormData(EnviarFormulario);
    
    if(formdata.get('accion') === 'create'){        
        fetch(rutaPatologia,{
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
        formdata.append('idSeleccionado',idSeleccionado)
        fetch(rutaPatologia,{
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
    fetch(rutaPatologia,{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(patologia => {
            const clone = template.cloneNode(true);
            clone.getElementById('idPatologia').textContent = patologia.codigo;
            clone.getElementById('nombre').textContent = patologia.nombre;

            clone.querySelector('.delete-button').dataset.codigo = patologia.codigo;
            clone.querySelector('.edit-button').dataset.codigo = patologia.codigo;

            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
    })
 };
 