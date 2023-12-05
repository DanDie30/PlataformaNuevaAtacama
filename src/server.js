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

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/GraficosCopiapo', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'GraficosCopiapo.html'));
});

  

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`)
})