function createDownloadSvgLink(linkId, buttonText, ctx) {
  var link = document.getElementById(linkId);
  link.addEventListener('click', function() {
    var dataUrl = ctx.canvas.toDataURL(); 
    var svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' + 
                     '<style>/* Agrega tus estilos aquí */</style>' +
                     '<foreignObject width="100%" height="100%">' +
                     '<div xmlns="http://www.w3.org/1999/xhtml">' +
                     '<img src="' + dataUrl + '" alt="Gráfico" />' +
                     '</div></foreignObject></svg>';
    link.href = 'data:image/svg+xml,' + encodeURIComponent(svgContent); 
  });
}
function createDownloadPngLink(linkId, buttonText, ctx) {
  var link = document.getElementById(linkId);
  link.addEventListener('click', function() {
    var dataUrl = ctx.canvas.toDataURL(); 
    link.href = dataUrl; 
  });
}
var ctxBarraCopiapo = document.getElementById('GraficoBarraCopiapo').getContext('2d');
var ctxLinealCopiapo = document.getElementById('GraficoLinealCopiapo').getContext('2d');
createDownloadPngLink('downloadPngBarraCopiapo', 'Exportar PNG (Gráfico de Barras)', ctxBarraCopiapo);
createDownloadSvgLink('downloadSvgBarraCopiapo', 'Exportar SVG (Gráfico de Barras)', ctxBarraCopiapo);
createDownloadPngLink('downloadPngLinealCopiapo', 'Exportar PNG (Gráfico Lineal)', ctxLinealCopiapo);
createDownloadSvgLink('downloadSvgLinealCopiapo', 'Exportar SVG (Gráfico Lineal)', ctxLinealCopiapo);


fetch('/recuentoEventosPorMesCopiapo')
  .then(response => response.json())
  .then(data => {
    console.log(data); 

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
    console.log(data); 

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
      label: 'Cantidad De Eventos Por Planta',
      data: [], // Aquí se colocarán los valores de los datos
      backgroundColor: 'rgba(90, 177, 38, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1,
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
        label: 'Recuento Por Mes',
        backgroundColor: 'rgba(48, 96, 159, 1)',
        borderColor: 'rgba(97, 97, 97, 1)',
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

    