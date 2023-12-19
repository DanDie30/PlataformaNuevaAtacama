const express = require('express')

const router = express.Router()

const controll = require('../controllers/controll');


router.get('/index', (req, res) => {
  res.sendFile('index.html', { root: './pages' });
});
router.get('/configuracion', (req, res) => {
    res.sendFile('Configuracion.html', { root: './pages' });
  });
  router.get('/login', (req, res) => {
    res.sendFile('Login.html', { root: './pages' });
  });  
router.get('/diagramachanaral', (req, res) => {
    res.sendFile('DiagramaChanaral.html', { root: './pages' });
  });
router.get('/diagramacopiapo', (req, res) => {
    res.sendFile('DiagramaCopiapo.html', { root: './pages' });
  });
  router.get('/confusuarios', (req, res) => {
    res.sendFile('ConfUsuarios.html', { root: './pages' });
  });
  router.get('/confalertas', (req, res) => {
    res.sendFile('ConfAlertas.html', { root: './pages' });
  });  
router.get('/diagramavallenar', (req, res) => {
    res.sendFile('DiagramaVallenar.html', { root: './pages' });
  });
router.get('/graficoschanaral', (req, res) => {
    res.sendFile('GraficoChanaral.html', { root: './pages' });
  });
  router.get('/graficoscopiapo', (req, res) => {
    res.sendFile('GraficosCopiapo.html', { root: './pages' });
  });
  
router.get('/graficosvallenar', (req, res) => {
    res.sendFile('GraficosVallenar.html', { root: './pages' });
  });
router.get('/mantenimientoprincipal', (req, res) => {
    res.sendFile('MantenimientoPrincipal.html', { root: './pages' });
  });
router.get('/registrodispositivos', (req, res) => {
    res.sendFile('RegistroDispositivos.html', { root: './pages' });
  });
router.get('/registrofallasDetectadas', (req, res) => {
    res.sendFile('RegistroFallasDetectadas.html', { root: './pages' });
  });
router.get('/informes', (req, res) => {
    res.sendFile('Informes.html', { root: './pages' });
  });
  router.get('/verdispositivos', (req, res) => {
    res.sendFile('VerDispositivos.html', { root: './pages' });
  });
  router.get('/verfallasdetectadas', (req, res) => {
    res.sendFile('VerFallasDetectadas.html', { root: './pages' });
  });
router.route('/data')
  .get(controll.obtenerDatosInformes) //Manejar GET
  .post(controll.saveDataFormFallas); // Manejar POST

  router.get('/data', (req, res) => {
    res.json({ message: 'Main poto' })
})
  .post(controll.saveDataFormFallas);

router.post('/data', controll.saveDataFormDispositivos);
//Graficos Vallenar
router.get('/recuentoEventoTresMesesVallenar', controll.obtenerTresMesesConMasEventosVallenar);
router.get('/recuentoEventosPorMesVallenar', controll.obtenerRecuentoEventosPorMesVallenar);

//Graficos Copiapo
router.get('/recuentoEventosPorPlantaCopiapo', controll.obtenerRecuentoEventosPorPlantaCopiapo);
router.get('/recuentoEventosPorMesCopiapo', controll.obtenerRecuentoEventosPorMesCopiapo);
router.get('/datosInformes', controll.obtenerDatosInformes);

//Graficos Chanaral
router.get('/recuentoEventosPorMesChanaral', controll.obtenerRecuentoEventosPorMesChanaral);
router.get('/recuentoEventoTresMesesChanaral', controll.obtenerTresMesesConMasEventosChanaral);

//Graficos Principal
router.get('/recuentoEventosPrincipal', controll.obtenerRecuentoTotalEventosPorMes);
router.get('/recuentoEventosPorPlantaPrincipal', controll.obtenerRecuentoEventosPorPlanta);

module.exports = router;