/*          RUTAS DEL MODULO            */
const rutaPaciente = 'http://localhost/Proyecto_ClinicasV2/Modelos/Paciente.php';
const rutaConsulta = 'http://localhost/Proyecto_ClinicasV2/Modelos/Consulta.php';
const rutaMedico = 'http://localhost/Proyecto_ClinicasV2/Modelos/Medico.php';

/*      Templates        */

const templateConsultas = document.getElementById('templateDatosConsultas').content;
const templateDetalles = document.getElementById('templatedetallesconsulta').content;
const fragment = document.createDocumentFragment();
const tablaHistoria = document.getElementById('tabla_datos');
const detallesConsulta = document.querySelector('.detallescont .detallesconsulta');
const search = document.querySelector('.sectioncont .searchbarcont');
const input = document.querySelector('.sectioncont .searchbar');

document.addEventListener('click', (e) =>{
    
    if (e.target.matches('.buttonbuscar')) {
        if (search.querySelector('.searchbar').value !== '') {
            buscarTabla(search.querySelector('.searchbar').value);
        }else{
            cargarTabla();
        }
        
    }

});

document.addEventListener('DOMContentLoaded', () =>{

    cargarTabla();

})

const cargarTabla = () =>{
    const formdata = new FormData();
    formdata.append("accion","readTabla");
    fetch(rutaConsulta,{
        method:'POST',
        body:formdata
    }).then(resp => resp.json()).then( data =>
        {
            tablaHistoria.textContent = '';

            data.forEach(consulta => {

                const clone = templateConsultas.cloneNode(true);

                clone.getElementById('id').textContent = consulta.id;
                clone.getElementById('paciente').textContent = consulta.nombre + " " + consulta.apellido;
                clone.getElementById('cedula').textContent = consulta.cedula;
                clone.getElementById('fecha').textContent = consulta.fecha;

                fragment.appendChild(clone);
            });

            tabla_datos.appendChild(fragment);
        })
}

const buscarTabla = (cedula) =>{
    const formdata = new FormData();
    formdata.append('accion','buscar');
    formdata.append('cedula', cedula);
    fetch(rutaConsulta,{
        method:'POST',
        body:formdata
    }).then(resp => resp.json()).then( data =>
        {
            tablaHistoria.textContent = '';

            data.forEach(busqueda => {
                const clone = templateConsultas.cloneNode(true);

                clone.getElementById('id').textContent = busqueda.id;
                clone.getElementById('paciente').textContent = busqueda.nombre + " " + busqueda.apellido;
                clone.getElementById('cedula').textContent = busqueda.cedula;
                clone.getElementById('fecha').textContent = busqueda.fecha;

                fragment.appendChild(clone);
            });

            tablaHistoria.appendChild(fragment);
        }
    )
}

