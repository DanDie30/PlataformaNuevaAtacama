//GRAFICOS COPIAPO
var ctx1 = document.getElementById('GraficosBarraCopiapo').getContext('2d');
var data1 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ejemplo de Gráfico de Barras',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [30, 10, 25, 15, 20], // Cambia estos valores
  }]
};
var options1 = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
var GraficosBarraCopiapo = new Chart(ctx1, {
  type: 'bar',
  data: data1,
  options: options1
});


var ctx3 = document.getElementById('GraficoLinealCopiapo').getContext('2d');
var data3 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ejemplo de Gráfico Lineal',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [10, 15, 20, 25, 30], // Cambia estos valores
  }]
};
var options3 = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
var GraficoLinealCopiapo = new Chart(ctx3, {
  type: 'line',
  data: data3,
  options: options3
});

