let EnviarFormulario = document.getElementById('formregistroAlergia');

document.addEventListener('DOMContentLoaded',e =>{
    let formdata = new FormData();
    formdata.append('accion','readAll');
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php',{
    method:'POST',
    body:formdata
    })
    .then(resp=> resp.json())
    .then(data => {

        console.log(data);

        const dataTableBody = document.getElementById('tabla_datos');
        
        data.forEach(alergia => {
            
            const newrow = document.createElement('tr');

            newrow.innerHTML = `
            <td>${alergia.id}</td>
            <td>${alergia.nombre}</td>
            <td>
                <button  type="button" class="edit-button" >Editar</button>
                <button  type="button" class="delete-button">Eliminar</button>
            </td>
            `;

            dataTableBody.appendChild(newrow);

        });
    })

});

console.log(EnviarFormulario);
EnviarFormulario.addEventListener('submit',e => {
    let formdata = new FormData(EnviarFormulario);
    
    formdata.append('accion','create');
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Alergia.php',{
        method:'POST',
        body:formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

});