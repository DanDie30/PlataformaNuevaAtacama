fetch('/recuentoEventosPorMes')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras
    GraficoLinealVallenar.data.labels = data.labels;
    GraficoLinealVallenar.data.datasets[0].data = data.data;

    // Actualiza el gráfico de barras
    GraficoLinealVallenar.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });


  fetch('/recuentoEventosPorPlanta') // Actualiza la ruta según tu configuración
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras
    GraficoBarraVallenar.data.labels = data.labels;
    GraficoBarraVallenar.data.datasets[0].data = data.data;

    // Actualiza el gráfico de barras
    GraficoBarraVallenar.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });




//GRAFICOS VALLENAR
var ctx1 = document.getElementById('GraficoBarraVallenar').getContext('2d');
var data1 = {
  labels: ['Vicuña', 'Cancha Rayada', 'Cartavio', 'Sectores Altos'],
  datasets: [{
    label: 'Ejemplo de Gráfico de Barras',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    data: [30, 10, 25, 15],
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
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre','Noviembre','Diciembre'],
  datasets: [{
    label: 'Recuento de falla por Mes general',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    data: [10, 15, 20, 25, 30, 10, 15, 20, 25, 30, 20,20], // Cambia estos valores
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