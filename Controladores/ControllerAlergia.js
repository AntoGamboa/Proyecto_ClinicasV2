let EnviarFormulario = document.getElementById('formregistro');
let template = document.getElementById('templateDatosAlergias').content;
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');

document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData();
            formdata.append('accion','delete')
            formdata.append('id',e.target.dataset.codigo)
            fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php',{
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

console.log(EnviarFormulario);
EnviarFormulario.addEventListener('submit',e => {
    let formdata = new FormData(EnviarFormulario);
    
    if(formdata.get('accion') === 'create'){        
        fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php',{
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
        fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php',{
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
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php',{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(alergia => {
            let clone = template.cloneNode(true);
            clone.getElementById('id').textContent = alergia.codigo;
            clone.getElementById('nombre').textContent = alergia.nombre;
            clone.querySelector('.delete-button').dataset.codigo = alergia.codigo;
           
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
    })
};