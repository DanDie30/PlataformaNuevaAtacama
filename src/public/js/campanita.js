const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();

// Middleware para procesar JSON
app.use(bodyParser.json());

// Configuración de la base de datos
const config = {
    user: 'adminsql',
    password: 'Megalodon_2001',
    server: 'servidortestsql.database.windows.net',
    database: 'BDTest',
    options: {
        encrypt: true,
    }
};

app.get('/obtenerValorSenal', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT TOP 1 ValorSenal FROM Evento ORDER BY IdSC DESC`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`campanita en ${PORT}`);
});
