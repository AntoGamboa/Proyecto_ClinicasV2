let EnviarFormulario = document.getElementById('formregistroconsulta');
let template = document.getElementById('templatedetallesconsulta').content;
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');
let ruta='';
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
        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(medico => {
            let clone = template.cloneNode(true);
            clone.getElementById('cedula').textContent = medico.cedula;
            clone.getElementById('nombre').textContent = medico.nombre;
            clone.getElementById('apellido').textContent = medico.apellido;
            clone.querySelector('.delete-button').dataset.cedula = medico.cedula;
            clone.querySelector('.edit-button').dataset.cedula = medico.cedula;
            fragment.appendChild(clone);
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

