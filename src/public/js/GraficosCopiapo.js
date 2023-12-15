fetch('/recuentoEventosPorMesCopiapo')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras
    GraficoLinealCopiapo.data.labels = data.labels;
    GraficoLinealCopiapo.data.datasets[0].data = data.data;

    // Actualiza el gráfico de barras
    GraficoLinealCopiapo.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

  fetch('/recuentoEventosPorPlantaCopiapo')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras
    GraficoBarraCopiapo.data.labels = data.labels;
    GraficoBarraCopiapo.data.datasets[0].data = data.data;

    // Actualiza el gráfico de barras
    GraficoBarraCopiapo.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });


//GRAFICOS COPIAPO
const GraficoBarraCopiapo = new Chart(document.getElementById('GraficoBarraCopiapo'), {
  type: 'bar',
  data: {
    labels: [], // Aquí se colocarán las etiquetas de los datos
    datasets: [{
      label: 'Cantidad de Eventos',
      data: [], // Aquí se colocarán los valores de los datos
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(0, 0, 0, 0.8)',
      // Color de fondo de las barras
    }]
  },
  options: {
    // Configuración de opciones del gráfico (ejemplo)
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});




    // El código JavaScript que generaste para crear los gráficos y los enlaces de descarga
    let ctx = document.getElementById('GraficoLinealCopiapo').getContext('2d');
    let data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{
        label: 'Ejemplo de Gráfico Lineal',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [30, 10, 25, 15, 20],
      }]
    };
    let options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    let GraficoLinealCopiapo = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });


