const express = require('express')  //Importar e iniciar como aplicacion App
const port = process.env.PORT || 3000; //Puerto definido
const router = require('./routes/router')
const path = require('path');

const morgan = require('morgan') //registro de solicitudes http para registro de desarrollo
const cors = require('cors') //Middleware para CORS, permite solicitudes desde diferentes puertos
const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) //Middleware para analizar datos JSON en solicitudes entrantes
app.use(express.urlencoded({ extended: true })) //Middleware para analziar datos de formulario en URL mediante solicitudes entrantes
app.use(router)


//Usamos las rutas en la raiz /
app.use('/pages', router);
  
app.use('/api', router); // Monta las rutas del router en /api

  app.use(express.static(__dirname + "/public")) //Configuracion de express para servir archivos estaticos desde public
  console.log(__dirname);


app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`)
})
