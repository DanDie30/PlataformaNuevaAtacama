fetch('/recuentoEventosPorMesVallenar')
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


// Llamada a la función para obtener los tres meses con más eventos
fetch('/recuentoEventoTresMesesVallenar') // Cambia la ruta según tu configuración
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras con los tres meses con más eventos
    GraficoBarraVallenar.data.labels = data.map(item => `Mes ${item.Mes}`); // Supongamos que usamos "Mes X" como etiqueta
    GraficoBarraVallenar.data.datasets[0].data = data.map(item => item.CantidadEventos);

    // Actualiza el gráfico de barras
    GraficoBarraVallenar.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos de los tres meses con más eventos:', error);
  });



//GRAFICOS VALLENAR
var ctx1 = document.getElementById('GraficoBarraVallenar').getContext('2d');
var data1 = {
  labels: ['Vicuña', 'Cancha Rayada', 'Cartavio', 'Sectores Altos'],
  datasets: [{
    label: 'Recuento de eventos ocurridos:',
    backgroundColor: 'rgba(90, 177, 38, 1)',
    borderColor: 'rgba(0, 0, 0, 1)',
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
    backgroundColor: 'rgba(48, 96, 159, 1)',
    borderColor: 'rgba(97, 97, 97, 1)',
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
