const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Diabetes', 'Hipertension', 'Hipotension', 'Cardiopatia '],
    datasets: [{
      label: 'Grafico de Patologias comunes entre los pacientes',
      data: [12, 19, 3, 5],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const Grafica = new Chart(document.getElementById('myChart2'), {
  type: 'bar',
  data: {
    labels: ['Traumatologia', 'Pediatria', 'Internista', ' Medicina General '],
    datasets: [{
      label: 'Grafico de Incidencias de los pacientes',
      data: [12, 19, 3, 5],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
