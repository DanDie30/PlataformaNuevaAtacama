const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mssql');

// Configuración de conexión a la base de datos
const config = {
  user: 'adminsql',
  password: 'Megalodon_2001',
  server: 'servidortestsql.database.windows.net',
  database: 'BDTest',
  options: {
    encrypt: true, 
  },
};

// middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// ruta para recibir los datos del formulario de MantenimientoDispositivos
app.post('/guardarDatosFormularioDispositivo', async (req, res) => {
  try {
    const pool = await sql.connect(config);

    // insertar los datos en la tabla MantenimientoDispositivos
    await pool.request()
      .input('IdSensor', sql.Int, req.body.IdSensor)
      .input('IdSector', sql.Int, req.body.IdSector)
      .input('IdPlanta', sql.Int, req.body.IdPlanta)
      .input('FechaMantenimiento', sql.Date, req.body.FechaMantenimiento)
      .input('ResponsableMantenimiento', sql.NVarChar, req.body.ResponsableMantenimiento)
      .input('DescripcionMantenimiento', sql.NVarChar, req.body.DescripcionMantenimiento)
      .query(`
        INSERT INTO MantenimientoDispositivos
        (IdSensor, IdSector, IdPlanta, FechaMantenimiento, ResponsableMantenimiento, DescripcionMantenimiento)
        VALUES
        (@IdSensor, @IdSector, @IdPlanta, @FechaMantenimiento, @ResponsableMantenimiento, @DescripcionMantenimiento)
      `);

    res.status(200).send('Datos insertados correctamente en MantenimientoDispositivos');
  } catch (err) {
    res.status(500).send('Error al insertar datos en MantenimientoDispositivos: ' + err.message);
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
