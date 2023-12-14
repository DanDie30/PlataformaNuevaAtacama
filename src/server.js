const express = require('express')
const port = process.env.PORT || 3000;
const router = require('./routes/router')
const path = require('path');

const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


app.use('/pages', router);
  
app.use('/api', router); // Monta las rutas del router en /api

  app.use(express.static(__dirname + "/public"))
  console.log(__dirname);


app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`)
})
