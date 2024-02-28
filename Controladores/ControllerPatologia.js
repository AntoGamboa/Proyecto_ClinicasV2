let EnviarFormulario = document.getElementById('formregistro');
let template = document.getElementById('templateDatosPatologia').content;
let fragment = document.createDocumentFragment();
let tabla_datos = document.getElementById('tabla_datos');


document.addEventListener('click',e => {
    if(e.target.matches('.delete-button'))
    {
       let resultado = window.confirm("Esta seguro de eliminar este registro");
       if(resultado==true){
            let formdata = new FormData();
            formdata.append('accion','eliminar')
            formdata.append('idPatologia',e.target.dataset.codigo)
            fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php',{
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

console.log(EnviarFormulario);
EnviarFormulario.addEventListener('submit',e => {
    e.preventDefault();
    let formdata = new FormData(EnviarFormulario);
    
    formdata.append('accion','create');
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php',{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

});


const cargarTabla = ()=>{
    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php',{
        method:'POST',
        body:formdata
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const dataTableBody = document.getElementById('tabla_datos');
        tabla_datos.textContent = '';
        data.forEach(patologia => {
            let clone = template.cloneNode(true);
            clone.getElementById('idPatologia').textContent = patologia.codigo;
            clone.getElementById('nombre').textContent = patologia.nombre;
            clone.querySelector('.delete-button').dataset.codigo = patologia.codigo;
            fragment.appendChild(clone);
        });
        tabla_datos.appendChild(fragment);
    })
 };