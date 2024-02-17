let formPaciente = document.getElementById('formPaciente');

document.addEventListener('DOMContentLoaded',e=>{
    formdata= new FormData();
    formdata.append('accion','readAll')
    fetch('../Modelos/Paciente.php',{
        method:'POST',
        body:formdata     
    })
    .then(response => response.json())
    .then(data => {


        const dataTableBody = document.getElementById('tabla_datos');
        
        data.forEach(paciente => {
            
            

            const newrow = document.createElement('tr');

            newrow.innerHTML = `
            <td>${paciente.Cedula}</td>
            <td>${paciente.Nombre}</td>
            <td>${paciente.Apellido}</td>
            <td>${paciente.TelefonoPrincipal}</td>
            <td>${paciente.TelefonoEmergencia}</td>
            <td>
                <button  type="button" class="edit-button" >Editar</button>
                <button  type="button" class="delete-button">Eliminar</button>
            </td>
            `;

            dataTableBody.appendChild(newrow);

        });

    })
});

formPaciente.addEventListener('submit', e =>{
    e.preventDefault();
    let formdata = new FormData(formPaciente);
    formdata.append('accion','create');   
    console.log(formdata) 
    fetch('https://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php',{
        method:'POST',
        body: formdata
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
});