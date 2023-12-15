fetch('/recuentoEventosPorPlantaPrincipal')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico con los datos obtenidos del servidor
    GraficoBarraPrincipal.data.labels = data.map(item => item.NombrePlanta); // Utiliza NombrePlanta en lugar de IdPlanta
    GraficoBarraPrincipal.data.datasets[0].data = data.map(item => item.CantidadEventos);

    // Actualiza el gráfico de barras
    GraficoBarraPrincipal.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });




fetch('/recuentoEventosPrincipal')
.then(response => response.json())
.then(data => {
  console.log(data); // Verifica la estructura de los datos en la consola

  // Actualiza los datos del gráfico de barras
  GraficoLinealPrincipal.data.labels = data.labels;
  GraficoLinealPrincipal.data.datasets[0].data = data.data;

  // Actualiza el gráfico de barras
  GraficoLinealPrincipal.update();
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
});

//GRAFICOS VALLENAR
var ctx1 = document.getElementById('GraficoBarraPrincipal').getContext('2d');
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
var GraficoBarraPrincipal = new Chart(ctx1, {
  type: 'bar',
  data: data1,
  options: options1
});





var ctx4 = document.getElementById('GraficoLinealPrincipal').getContext('2d');
var data4 = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre','Noviembre','Diciembre'],
  datasets: [{
    label: 'Recuento de falla por Mes general',
    backgroundColor: 'rgba(48, 96, 159, 1)',
    borderColor: 'rgba(97, 97, 97, 1)',
    borderWidth: 1,
    data: [10, 15, 20, 25, 30, 10, 15, 20, 25, 30, 20,20], // Cambia estos valores
  }]
};
var options4 = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
var GraficoLinealPrincipal = new Chart(ctx4, {
  type: 'line',
  data: data4,
  options: options4
});
