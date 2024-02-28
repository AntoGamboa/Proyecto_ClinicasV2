let EnviarFormulario = document.getElementById('formregistromedico');
let template = document.getElementById('templatedatosmedicos').content;
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');

document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData()
            formdata.append('accion','eliminar')
            formdata.append('cedula',e.target.dataset.cedula)
            fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Medico.php',{
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
    cargarTabla()
});
EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    let formdata = new FormData(EnviarFormulario);
    formdata.append('accion','create');
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Medico.php',{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

});
const cargarTabla = ()=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Medico.php',{
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
            clone.querySelector('.edit-button').dataset.cedula=medico.cedula;
            clone.querySelector('.delete-button').dataset.cedula=medico.cedula;
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
    })
}
