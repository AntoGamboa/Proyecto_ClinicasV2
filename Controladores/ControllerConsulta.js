document.addEventListener('DOMContentLoaded',e =>{

   


    let formdata = new FormData();
    formdata.append("accion","readAll");
    fetch('../Modelos/.php',{
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
                <button  type="button" class="delete-button">Eliminar</button>
            </td>
            `;

            dataTableBody.appendChild(newrow);

        });
    })
    
});