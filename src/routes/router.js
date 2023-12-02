const express = require('express')

const router = express.Router()

const { saveDataFormFallas, save, setearDatas } = require('../controllers/controll')

router.get('/data', (req, res) => {
    res.json({ message: 'Main Route' })
})

router.post('/data', saveDataFormFallas)

router.put('/data', setearDatas )

module.exports = router;