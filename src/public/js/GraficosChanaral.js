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
  //Funcion para descargar graficos en PNG
}
function createDownloadPngLink(linkId, buttonText, ctx) {
  var link = document.getElementById(linkId);
  link.addEventListener('click', function() {
    var dataUrl = ctx.canvas.toDataURL(); 
    link.href = dataUrl; 
  });
}
var ctxBarraCopiapo = document.getElementById('GraficoBarraChanaral').getContext('2d');
var ctxLinealCopiapo = document.getElementById('GraficoLinealChanaral').getContext('2d');
createDownloadPngLink('downloadPngBarraChanaral', 'Exportar PNG (Gráfico de Barras)', ctxBarraCopiapo);
createDownloadSvgLink('downloadSvgBarraChanaral', 'Exportar SVG (Gráfico de Barras)', ctxBarraCopiapo);
createDownloadPngLink('downloadPngLinealChanaral', 'Exportar PNG (Gráfico Lineal)', ctxLinealCopiapo);
createDownloadSvgLink('downloadSvgLinealChanaral', 'Exportar SVG (Gráfico Lineal)', ctxLinealCopiapo);



fetch('/recuentoEventosPorMesChanaral')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras
    GraficoLinealChanaral.data.labels = data.labels;
    GraficoLinealChanaral.data.datasets[0].data = data.data;

    // Actualiza el gráfico de barras
    GraficoLinealChanaral.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });



// Llamada a la función para obtener los tres meses con más eventos
fetch('/recuentoEventoTresMesesChanaral') // Cambia la ruta según tu configuración
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura de los datos en la consola

    // Actualiza los datos del gráfico de barras con los tres meses con más eventos
    GraficoBarraChanaral.data.labels = data.map(item => `Mes ${item.Mes}`); // Supongamos que usamos "Mes X" como etiqueta
    GraficoBarraChanaral.data.datasets[0].data = data.map(item => item.CantidadEventos);

    // Actualiza el gráfico de barras
    GraficoBarraChanaral.update();
  })
  .catch(error => {
    console.error('Error al obtener los datos de los tres meses con más eventos:', error);
  });




//GRAFICOS Chañaral
var ctx1 = document.getElementById('GraficoBarraChanaral').getContext('2d');
var data1 = {
  labels: ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4', 'Dato 5'],
  datasets: [{
    label: 'Top 3 Meses Con Mas Eventos',
    backgroundColor: 'rgba(90, 177, 38, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
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
var GraficoBarraChanaral = new Chart(ctx1, {
  type: 'bar',
  data: data1,
  options: options1
});


var ctx3 = document.getElementById('GraficoLinealChanaral').getContext('2d');
var data3 = {
  labels: ['Dato 5', 'Dato 2', 'Dato 3', 'Dato 4', 'Dato 5'],
  datasets: [{
    label: 'Recuento De Eventos',
    backgroundColor: 'rgba(48, 96, 159, 1)',
    borderColor: 'rgba(97, 97, 97, 1)',
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
var GraficoLinealChanaral = new Chart(ctx3, {
  type: 'line',
  data: data3,
  options: options3
});
