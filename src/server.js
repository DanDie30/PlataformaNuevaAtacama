const express = require('express')
const port = process.env.PORT || 3000;
const router = require('./routes/router')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`)
})