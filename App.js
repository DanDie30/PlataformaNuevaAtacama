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
    encrypt: true, // Si estás en Azure, suele ser necesario
  },
};

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para recibir los datos del formulario
app.post('/guardarDatosFormulario', async (req, res) => {
  try {
    const pool = await sql.connect(config);

    // Obtener el tiempo del formulario y ajustar su formato si es necesario
    const horaDetencion = req.body.HoraDetencion + ":00"; // Agregar segundos
    const horaResolucion = req.body.HoraResolucion + ":00"; // Agregar segundos

    ///generar endpoint y controlador a parte

    // Insertar los datos en la tabla
    await pool.request()
      .input('TipoFalla', sql.NVarChar, req.body.TipoFalla)
      .input('IdSector', sql.Int, req.body.IdSector)
      .input('IdPlanta', sql.NVarChar, req.body.IdPlanta)
      .input('FechaDetencion', sql.Date, req.body.FechaDetencion)
      .input('Descripcion', sql.NVarChar, req.body.Descripcion)
      .input('ResponsableMantenimiento', sql.NVarChar, req.body.ResponsableMantenimiento)
      .input('HoraDetencion', sql.NVarChar, horaDetencion) // Usar NVarChar para el tiempo
      .input('HoraResolucion', sql.NVarChar, horaResolucion) // Usar NVarChar para el tiempo
      .input('FechaResolucion', sql.Date, req.body.FechaResolucion)
      .query(`
        INSERT INTO MantenimientoFallaDetectada
        (TipoFalla, IdSector, IdPlanta, FechaDetencion, Descripcion, ResponsableMantenimiento, HoraDetencion, HoraResolucion, FechaResolucion)
        VALUES
        (@TipoFalla, @IdSector, @IdPlanta, @FechaDetencion, @Descripcion, @ResponsableMantenimiento, @HoraDetencion, @HoraResolucion, @FechaResolucion)
      `);

    res.status(200).send('Datos insertados correctamente');
  } catch (err) {
    res.status(500).send('Error al insertar datos: ' + err.message);
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
