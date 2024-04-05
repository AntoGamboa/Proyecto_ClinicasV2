const rutaGraficas = 'http://localhost/Proyecto_ClinicasV2/Modelos/Graficas.php';

const reporte1FechaIni = document.getElementById('fechainicio');
const reporte1FechaF = document.getElementById('fechafinal');

const ctx = document.getElementById('myChart');
const grafica2Name = document.getElementById('myChart2');
const grafica3Name = document.getElementById('myChart3');
const grafica4Name = document.getElementById('myChart4');
const grafica5Name = document.getElementById('myChart5');
const grafica6Name = document.getElementById('myChart6');


console.log(reporte1FechaF);

document.addEventListener('click', (e) =>{
    if (e.target.matches('#filtro1') ) {
      console.log('Click');
      let fechaInicio = new Date(reporte1FechaIni.value);
      let fechaFinal = new Date(reporte1FechaF.value);
    
      graficaPacientesMedicos(fechaInicio,fechaFinal);
    }

});

document.addEventListener('DOMContentLoaded', ()=>{
  graficaCantidadMedicos();
  graficaAlergiasPaciente();
})

const graficaPacientesMedicos = (fechaIni,FechaFin) => {
  const formdata = new FormData();

  formdata.append('accion','pacienteMedicos');
  formdata.append('FechaInicio',fechaIni);
  formdata.append('FechaFinal',FechaFin);

  fetch(rutaGraficas,{
    method:'POST',
    body:formdata
  }).then(resp => resp.json())
  .then(data =>
    {
      console.log(data);
      primeraGrafica(data)
    })
}


const primeraGrafica= (data) => new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.map(item => item.nombre),
      datasets: [{
        label: 'Grafico de pacientes atendidos por medicos en un rango de fecha ',
        data: data.map(item=>item.cantidadPA),
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



/*GRAFICA 5 LISTA*/

const graficaCantidadMedicos = () =>{
  let formdata = new FormData();

  formdata.append('accion','CantMedicoEsp');
  
  fetch(rutaGraficas,{
    method:'POST',
    body:formdata
  }).then(resp => resp.json())
  .then(data =>{
    console.log(data);
    graficaCantidadMedico(data);
  })
} 


const graficaCantidadMedico= (data) =>new Chart(grafica5Name, {
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

const graficaAlergiasPaciente = ()=> {
  let formdata = new FormData();


 formdata.append('accion','CantdPaciAler');
  
  fetch(rutaGraficas,{
    method:'POST',
    body:formdata
  }).then(resp => resp.json())
  .then(data =>{
    console.log(data);
    CantidadAlergiasP(data);
  })
} 



const CantidadAlergiasP = (data)=> new Chart(grafica6Name, {
  type: 'bar',
  data: {
    labels: data.map(item=> item.alergia),
    datasets: [{
      label: 'Grafico de pacientes atendidos por una especialidad',
      data: data.map(item=>item.cantidad),
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


































const graficaAreaM = new Chart(grafica2Name, {
  type: 'pie',
  data: {
    labels: ['Traumatologia', 'Pediatria', 'Internista', ' Medicina General '],
    datasets: [{
      label: 'Grafico de pacientes atendidos por una especialidad',
      data: [12, 19, 3, 5],
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

const graficaIMC = new Chart(grafica3Name, {
  type: 'pie',
  data: {
    labels: ['Traumatologia', 'Pediatria', 'Internista', ' Medicina General '],
    datasets: [{
      label: 'Grafico de Curvas sobre el IMC de un paciente',
      data: [12, 19, 3, 5],
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

const graficaEdades = new Chart(grafica4Name, {
  type: 'line',
  data: {
    labels: ['Traumatologia', 'Pediatria', 'Internista', ' Medicina General '],
    datasets: [{
      label: 'Grafico de lineas de los Pacientes por rango de edad',
      data: [12, 19, 3, 5],
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






