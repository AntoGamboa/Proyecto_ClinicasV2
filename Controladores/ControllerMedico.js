let EnviarFormulario = document.getElementById('formregistromedico');


document.addEventListener('DOMContentLoaded',e =>{

   


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
        
        data.forEach(medico => {
            
            alert("hola");

            const newrow = document.createElement('tr');

            newrow.innerHTML = `
            <td>${medico.cedula}</td>
            <td>${medico.nombre}</td>
            <td>${medico.apellido}</td>
            <td>
                <button  type="button" class="edit-button" >Editar</button>
                <button  type="button" class="delete-button" data-idmedico="${medico.cedula}">Eliminar</button>
            </td>
            `;

            dataTableBody.appendChild(newrow);

        });
    })
    
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