const rutaGraficas = 'http://localhost/Proyecto_ClinicasV2/Modelos/Graficas.php';

const reporte1FechaIni = document.getElementById('fechainicio');
const reporte1FechaF = document.getElementById('fechafinal');

const ctx = document.getElementById('myChart');
const grafica2Name = document.getElementById('myChart2');
const grafica3Name = document.getElementById('myChart3');
const grafica4Name = document.getElementById('myChart4');
const grafica5Name = document.getElementById('myChart5');
const grafica6Name = document.getElementById('myChart6');

const inputSegundoI = document.getElementById('fechainicio2');
const inputSegundoF = document.getElementById('fechafinal2');


const inputSegundoCedu = document.getElementById('Cedulamedico');
const inputTerceraI = document.getElementById('edadPacienteI');
const inputTerceraF = document.getElementById('EdadPacienteF')

const inputCuartoI = document.getElementById('fechainicio3');
const inputCuartoF = document.getElementById('fechafinal3');

let templatecanvaschart = document.getElementById("templatecanvaschart").content;
let templatecanvaschart2 = document.getElementById("templatecanvaschart2").content;
let templatecanvaschart3 = document.getElementById("templatecanvaschart3").content;
let templatecanvaschart4 = document.getElementById("templatecanvaschart4").content;


let divContainer = document.querySelector(".container-grafica")
let divContainer2 = document.querySelector(".container-grafica2")
let divContainer3 = document.querySelector(".container-grafica3")
let divContainer4 = document.querySelector(".container-grafica4")
let fragment = document.createDocumentFragment();

console.log(reporte1FechaF);

document.addEventListener('click', (e) => {
  if (e.target.matches('#filtro1')) {

    graficaPacientesMedicos(reporte1FechaIni.value, reporte1FechaF.value);
  }
  if (e.target.matches('#filtro2')) {
    console.log(inputSegundoI.value);
    console.log(inputSegundoF.value);
    console.log(inputSegundoCedu.value);
    CantidadConsultasM(inputSegundoI.value, inputSegundoF.value, inputSegundoCedu.value);
  }
  if (e.target.matches('#filtro3')) {

    terceraGraciaRangos(inputTerceraI.value, inputTerceraF.value);
  }
  if (e.target.matches('#filtro4')) {

    AjaxcantconsulPAT(inputCuartoI.value, inputCuartoF.value);
  }


});

document.addEventListener('DOMContentLoaded', () => {
  graficaCantidadMedicos();
  graficaAlergiasPaciente();
})

const graficaPacientesMedicos = (fechaIni, FechaFin) => {
  const formdata = new FormData();

  formdata.append('accion', 'pacienteMedicos');
  formdata.append('fechaInicio', fechaIni);
  formdata.append('fechaFinal', FechaFin);

  console.log(fechaIni);
  console.log(FechaFin);

  fetch(rutaGraficas, {
    method: 'POST',
    body: formdata
  }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      primeraGrafica(data);
    })
}


const primeraGrafica = (data) => {

  divContainer.removeChild(document.getElementById('myChart'));
  let clone = templatecanvaschart.cloneNode(true);
  fragment.appendChild(clone);
  divContainer.appendChild(fragment)

  new Chart(document.getElementById('myChart'), {
    type: 'pie',
    data: {
      labels: data.map(item => item.nombre),
      datasets: [{
        label: 'Grafico de pacientes atendidos por medicos en un rango de fecha ',
        data: data.map(item => item.cantidadPA),
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })


};


//Segunda Grafica

const CantidadConsultasM = (fechaIni, FechaFin, cedula) => {
  const formdata = new FormData();

  formdata.append('accion', 'CantPacMedicoSelect');
  formdata.append('FechaInicion', fechaIni);
  formdata.append('FechaFinal', FechaFin);
  formdata.append('CedulaMedico', cedula);

  fetch(rutaGraficas, {
    method: 'POST',
    body: formdata
  }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      graficaAtendidosM(data);
    })
}

const graficaAtendidosM = (data) => {
  divContainer2.removeChild(document.getElementById('myChart2'));
  let clone = templatecanvaschart2.cloneNode(true);
  fragment.appendChild(clone);
  divContainer2.appendChild(fragment)

  new Chart(document.getElementById('myChart2'), {
    type: 'line',
    data: {
      labels: data.map(item => item.medico),
      datasets: [{
        label: 'Grafico de pacientes atendidos por una especialidad',
        data: data.map(item => item.cantidadP),
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
};



//TERCERA GRAFICA

const terceraGraciaRangos = (inputI, inputF) => {
  let formdata = new FormData();
  console.log(inputI);
  console.log(inputF);
  formdata.append('accion', 'PacRgoEdades');
  formdata.append('EdadIncio', inputI);
  formdata.append('EdadFinal', inputF);

  fetch(rutaGraficas, {
    method: 'POST',
    body: formdata
  }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      graficaRangoEdad(data);
    })
}


const graficaRangoEdad = (data) => {
  divContainer3.removeChild(document.getElementById('myChart3'));
  let clone = templatecanvaschart3.cloneNode(true);
  fragment.appendChild(clone);
  divContainer3.appendChild(fragment)

  new Chart(document.getElementById('myChart3'), {
    type: 'pie',
    data: {
      labels: data.map(item => item.edad),
      datasets: [{
        label: 'Grafico de pastel de la edades mas frecuentes entre los pacientes',
        data: data.map(item => item.cantidad),
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
};
/**GRAFICA 4 LISTA* */
const AjaxcantconsulPAT = (fechaIni, FechaFin) => {
  const formdata = new FormData();

  formdata.append('accion', 'CantConsultaPat');
  formdata.append('fechaInicio', fechaIni);
  formdata.append('fechaFinal', FechaFin);

  console.log(fechaIni);
  console.log(FechaFin);

  fetch(rutaGraficas, {
    method: 'POST',
    body: formdata
  }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      cantConsulPat(data);
    })
}


/*GRAFICA 5 LISTA*/

const graficaCantidadMedicos = () => {
  let formdata = new FormData();

  formdata.append('accion', 'CantMedicoEsp');

  fetch(rutaGraficas, {
    method: 'POST',
    body: formdata
  }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      graficaCantidadMedico(data);
    })
}


const graficaCantidadMedico = (data) => new Chart(grafica5Name, {
  type: 'bar',
  data: {
    labels: data.map(item => item.especialidad),
    datasets: [{
      label: 'Grafico Pastel de la cantidad de medicos por Especialidad',
      data: data.map(item => item.cantidad),
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

//SEXTA GRAFICA LISTA

const graficaAlergiasPaciente = () => {
  let formdata = new FormData();


  formdata.append('accion', 'CantdPaciAler');

  fetch(rutaGraficas, {
    method: 'POST',
    body: formdata
  }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      CantidadAlergiasP(data);
    })
}



const CantidadAlergiasP = (data) => new Chart(grafica6Name, {
  type: 'bar',
  data: {
    labels: data.map(item => item.alergia),
    datasets: [{
      label: 'Grafico de barra de cantidad de alergias comunes por paciente',
      data: data.map(item => item.cantidad),
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
const cantConsulPat = (data) => {
  divContainer4.removeChild(document.getElementById('myChart4'));
  let clone = templatecanvaschart4.cloneNode(true);
  fragment.appendChild(clone);
  divContainer4.appendChild(fragment)

  new Chart(document.getElementById('myChart4'), {
    type: 'line',
    data: {
      labels: data.map(item => item.patologia),
      datasets: [{
        label: 'Grafico de lineas de los Consultas con Patologias',
        data: data.map(item => item.cantidad),
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
};






