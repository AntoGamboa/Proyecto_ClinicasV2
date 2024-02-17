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
        
        data.forEach(alergia => {
            
            alert("hola");

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