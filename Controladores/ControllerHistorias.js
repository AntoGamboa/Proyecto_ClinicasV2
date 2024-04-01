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
 

document.addEventListener('click',(e) => {
    if(e.target.matches('.pdf-button'))
    {  
      reporteHistoria(e.target.dataset.cedula);
    }

})

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
                clone.querySelector('.pdf-button').dataset.cedula = consulta.cedula;
                clone.querySelector('.edit-button').dataset.cedula = consulta.cedula;
                clone.querySelector('.delete-button').dataset.cedula = consulta.cedula;

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

const reporteHistoria = (cedula) =>{
    const formdata = new FormData();
    formdata.append('accion','read');
    formdata.append('cedula',cedula)
    fetch(rutaConsulta,{
        method:'POST',
        body:formdata
    }).then(resp => resp.json()).then(data => {
        const reporte = document.querySelector('.controller-principal')
        window.jsPDF = window.jspdf.jsPDF;
        const PDF = new jsPDF('p', 'px', 'letter');
        const scale = (PDF.internal.pageSize.width - 8)  / document.body.clientWidth;
        console.log(data);

        
        console.log( "Ancho del PDF:" + PDF.internal.pageSize.width);
        console.log("Ancho del DOM" + document.body.clientWidth);

            const opt = {
                callback: (PDF) => { 
                    PDF.save('Prueba1.pdf')
                },
                margin: [10, 3, 3, 3], //cuidao xd
                autoPaging: 'text',
                html2canvas: {
                    allowTaint: true,
                    dpi: 300,
                    letterRendering: true,
                    logging: false,
                    scale: scale
                }
            }
            const clone = reporte.cloneNode(true);


            data.forEach(item => {
                let nacimiento = new Date(item.nacimientopaci);
                let fechaActual = new Date();


                clone.querySelector('.controller-sections h2').textContent = 'Ficha de Identificacion:'+item.cedulapaci;
                clone.querySelector('#nombreR').textContent = item.nombrepaci;
                clone.querySelector('#apellidoR').textContent = item.apellidopaci;
                clone.querySelector('#edadR').textContent = `${fechaActual.getFullYear() - nacimiento.getFullYear()}`;
                clone.querySelector('#tlfono').textContent = item.tlfonoPaciente;
                clone.querySelector('#descripcionR').textContent = item.descripcion;
                clone.querySelector('#fechaR').textContent = 'Nombre del Doctor: ' + item.nombremedi + " "+ item.apellidomedi + ", Fecha y hora: " + item.fechaConsulta;
            });

            clone.style.display = 'flex';
        
            PDF.html(clone,opt);
        
    });

}

