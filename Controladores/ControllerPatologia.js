const EnviarFormulario = document.getElementById('formregistro');
const template = document.getElementById('templateDatosPatologia').content;
const fragment = document.createDocumentFragment();
const tabla_datos = document.getElementById('tabla_datos');
const rutaPatologia= 'http://localhost/Proyecto_ClinicasV2/Modelos/Patologia.php';
let idSeleccionado = '';

var patologias = [];


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

    if (!(formdata.get('patologia') && formdata.get('patologia').length >= 2 && formdata.get('patologia').length <= 5 && /\d.*\d/.test(formdata.get('patologia')) && /^[a-zA-Z0-9]+$/.test(formdata.get('patologia')))) {

        generarmensaje("alerta", "El codigo debe tener minimo 2 numeros y maximo 5, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    if (!(formdata.get('nombre') && formdata.get('nombre').length >= 2 && /^[a-zA-Z\s]+$/.test(formdata.get('nombre')))) {

        generarmensaje("alerta", "El nombre de la Patologia solo debe contener letras y debe tener minimo 2 caracteres, ademas no debe contener caracteres especiales (*-_/@)")
        return;

    }
    
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

        patologias = data;

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

const filtrartablapatologias = (busqueda)=>{
    

        tabla_datos.textContent = '';

        patologias.forEach(patologia => {

            if(patologia.nombre.toLowerCase().includes(busqueda.toLowerCase())){
                
                const clone = template.cloneNode(true);
                clone.getElementById('idPatologia').textContent = patologia.codigo;
                clone.getElementById('nombre').textContent = patologia.nombre;
    
                clone.querySelector('.delete-button').dataset.codigo = patologia.codigo;
                clone.querySelector('.edit-button').dataset.codigo = patologia.codigo;
    
                fragment.appendChild(clone);


            }
            


        });
        tabla_datos.appendChild(fragment);
    
};





const inputbusqueda = document.querySelector(".searchbarcont input");
const botonbusqueda = document.querySelector(".searchbarcont button")


botonbusqueda.addEventListener('click', ()=>{

    let busqueda = inputbusqueda.value;
    

    if(busqueda == ''){

      patologias = [];
      cargarTabla();

    }else{

      filtrartablapatologias(busqueda);

    }
})
 