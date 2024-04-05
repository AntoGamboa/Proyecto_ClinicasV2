const ctx = document.getElementById('myChart');
const grafica2Name = document.getElementById('myChart2');
const grafica3Name = document.getElementById('myChart3');
const grafica4Name = document.getElementById('myChart4');
const grafica5Name = document.getElementById('myChart5');

 const graficaConsultas = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Diabetes', 'Hipertension', 'Hipotension', 'Cardiopatia '],
    datasets: [{
      label: 'Grafico de pacientes atendidos por medicos en un rango de fecha ',
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

const graficaPatologia =new Chart(grafica5Name, {
  type: 'bar',
  data: {
    labels: ['Traumatologia', 'Pediatria', 'Internista', ' Medicina General '],
    datasets: [{
      label: 'Grafico Pastel de la cantidad de pacientes que presentan una patologia',
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





