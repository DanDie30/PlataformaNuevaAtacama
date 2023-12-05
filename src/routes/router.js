const express = require('express')

const router = express.Router()

const { saveDataFormFallas, save, setearDatas, obtenerEventosPorMes, obtenerDatosInformes } = require('../controllers/controll')

router.get('/data', (req, res) => {
    res.json({ message: 'Main Route' })
})

router.post('/data', saveDataFormFallas)

router.put('/data', setearDatas )

router.get('/data', obtenerEventosPorMes);

router.get('/data', obtenerDatosInformes);

module.exports = router;