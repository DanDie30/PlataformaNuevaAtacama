// Función para actualizar el gráfico lineal con los datos recibidos
function actualizarGraficoLineal(datos) {
  // Actualizar las etiquetas del eje X con los meses
  const meses = datos.map(item => item.mes);
  GraficoLinealCopiapo.data.labels = meses;

  // Actualizar los datos del gráfico con la cantidad de eventos por mes
  const eventos = datos.map(item => item.eventos);
  GraficoLinealCopiapo.data.datasets[0].data = eventos;

  // Actualizar el gráfico
  GraficoLinealCopiapo.update();
}

// Realizar la solicitud AJAX al servidor para obtener los datos de eventos por mes
fetch('/data') // Asegúrate de que esta ruta coincida con la definida en el servidor
  .then(response => response.json())
  .then(data => {
    // Una vez obtenidos los datos, llamar a la función para actualizar el gráfico
    actualizarGraficoLineal(data);
  })
  .catch(error => {
    // Manejar errores en caso de que la solicitud falle
    console.error('Error al obtener datos de eventos por mes:', error);
  });

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
      data: [30, 10, 25, 15, 20], 
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

