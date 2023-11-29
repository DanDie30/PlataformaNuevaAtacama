//GRAFICOS VALLENAR
var ctx1 = document.getElementById('GraficoBarraVallenar').getContext('2d');
var data1 = {
  labels: ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4', 'Dato 5'],
  datasets: [{
    label: 'Ejemplo de Gráfico de Barras',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    data: [30, 10, 25, 15, 20],
    }]
};
var options1 = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
var GraficoBarraVallenar = new Chart(ctx1, {
  type: 'bar',
  data: data1,
  options: options1
});


var ctx3 = document.getElementById('GraficoLinealVallenar').getContext('2d');
var data3 = {
  labels: ['Dato 5', 'Dato 2', 'Dato 3', 'Dato 4', 'Dato 5'],
  datasets: [{
    label: 'Ejemplo de Gráfico de Barras',
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
var GraficoLinealVallenar = new Chart(ctx3, {
  type: 'line',
  data: data3,
  options: options3
});
