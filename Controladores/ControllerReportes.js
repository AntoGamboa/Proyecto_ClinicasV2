const rutaConsulta = 'http://localhost/Proyecto_ClinicasV2/Modelos/Consulta.php';

const reporteInci = document.querySelector('.container-reporte');


document.addEventListener('click', e => {

    if (e.target.matches('.btn-reporteInci')) {
        reporteIncidencias();
    }

});

const reporteIncidencias= () =>{
    const formdata = new FormData();
    formdata.append('accion','readIncidencias');
    fetch(rutaConsulta,{
        method:'POST',
        body:formdata
    }).then(resp => resp.json()).then(data => {

        window.jsPDF = window.jspdf.jsPDF;
        const PDF = new jsPDF('p', 'px', 'letter');
        const scale = (PDF.internal.pageSize.width - 8)  / document.body.clientWidth;
        console.log(data);


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

            const clone = reporteInci.cloneNode(true);
            clone.querySelector('#tbody td').textContent = '';

            data.forEach(item => {
                let fechaConsulta = new Date(item.fecha);
                let hora = new Date(fechaConsulta.toLocaleTimeString())
                let turno = determinarTurno(hora);

                clone.querySelector('#nombreM').textContent = item.nombremedi + " " + item.apellidomedi;
                clone.querySelector('#especialidadM').textContent = item.especialidad;
                clone.querySelector('#cantP').textContent = item.cantidad;
                clone.querySelector('#fecha').textContent = fechaConsulta.toLocaleDateString();
                clone.querySelector('#turno').textContent = turno;
            });

            clone.style.display = 'flex';
        
            PDF.html(clone,opt);
        
    });
}

/*       FUNCION PARA EL TRATAMIENTO DEL TURNO     */
const determinarTurno = (date) =>{
    let auxiliar = ''
    if (date.getHours() > 8  && date.getHours() <= 12) {
        auxiliar = "Mañana";
    }
    else{
        auxiliar = "Tarde";    
    }
    return auxiliar;
}