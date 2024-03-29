const formEspecialidad = document.getElementById('formregistro');
const tablaDatos = document.getElementById('tabla_datos');
const templateEspecialidades = document.getElementById('templateEspecialidades').content;
const fragmento = document.createDocumentFragment();

let codigoSeleccionado = '';

const ruta = 'http://localhost/Proyecto_ClinicasV2/Modelos/Especialidad.php';

var especialidades=[];


formEspecialidad.addEventListener('submit',e =>
{
    e.preventDefault();
    const formData = new FormData(formEspecialidad);
    if (formData.get('accion') === 'create')
    {
        fetch(ruta,{method:'POST', body: formData})
        .then(resp => resp.json())
        .then(data  => { 
            alert(data.mensaje)
            cargarEspecialidad();
            cambiotabla();
         })
        .catch(data => alert(data.mensaje))
    }
    else if (formData.get('accion') === 'update')
    {
        formData.append('codigoSeleccionado',codigoSeleccionado);
        
        fetch(ruta,{method:'POST',body: formData})
        .then(resp => resp.json())
        .then(data => {
            alert(data.mensaje)
            cargarEspecialidad();
            cambiotabla();
        })
    }
   
})

document.addEventListener('click', e =>
{
    if (e.target.matches('.delete-button')) 
    {
    console.log(e.target.dataset.codigo);
    let resultado = window.confirm('¿ Desea eliminar este registro de la tabla ?');
        if (resultado) 
        {
            let formData = new FormData();
            formData.append('accion','eliminar');
            formData.append('codigo', e.target.dataset.codigo)
        
            fetch(ruta,{method:'POST', body:formData})
            .then(resp => resp.json())
            .then(data => {
                alert(data.mensaje)
                cargarEspecialidad();
            })    
        }
    }
    if (e.target.matches('.edit-button')) 
    {
        codigoSeleccionado = e.target.dataset.codigo;    
    }
})

document.addEventListener('DOMContentLoaded',() =>
{
    cargarEspecialidad();
})


const cargarEspecialidad = () => 
{
    const formData = new FormData()
    formData.append('accion','readAll')

    fetch( ruta ,{method:'POST',body: formData})
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);

        especialidades = data;

        tablaDatos.textContent = '';
        data.forEach(Especialidad => 
        {

            
            const clone = templateEspecialidades.cloneNode(true);
            clone.getElementById('codigo').textContent = Especialidad.codigo;
            clone.getElementById('nombre').textContent = Especialidad.nombre;
            clone.querySelector('.delete-button').dataset.codigo = Especialidad.codigo;
            clone.querySelector('.edit-button').dataset.codigo = Especialidad.codigo;

            fragmento.appendChild(clone);
        });

        tablaDatos.appendChild(fragmento);
    });

}


const filtrartablaespecialidad = (busqueda) => 
{
    
    tablaDatos.textContent = '';
    especialidades.forEach(Especialidad => 
    {
        if(especialidad.nombre === busqueda){

            const clone = templateEspecialidades.cloneNode(true);
            clone.getElementById('codigo').textContent = Especialidad.codigo;
            clone.getElementById('nombre').textContent = Especialidad.nombre;
            clone.querySelector('.delete-button').dataset.codigo = Especialidad.codigo;
            clone.querySelector('.edit-button').dataset.codigo = Especialidad.codigo;

            fragmento.appendChild(clone);
        }
        
    });

    tablaDatos.appendChild(fragmento);
    

}



const inputs = document.querySelector(".searchbarcont input");
const botonbusqueda = document.querySelector(".searchbarcont button")


botonbusqueda.addEventListener('click', ()=>{


    if(busqueda == ''){
      especialidades = [];
      cargarEspecialidad();
    }else{
      let busqueda = inputs.textContent;
      filtrartablaespecialidad(busqueda);

    }
});