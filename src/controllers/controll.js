const sql = require('mssql')
const pool = require('../utils/db')

const obtenerDatosInformes = async (req, res) => {
    try {
        const result = await pool.request().query(
        `SELECT * FROM Planta`);
  
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).send('Error al obtener datos de eventos por mes: ' + err.message);
      console.log(err.message);
    }
  };





const saveDataFormFallas = async (req, res) => {
    try {

        const horaDetencion = req.body.HoraDetencion + ":00";
        const horaResolucion = req.body.HoraResolucion + ":00";

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

        console.log(err.message)
    }
}

const saveDataFormDispositivos = async () => {
    try {

        const horaDetencion = req.body.HoraDetencion + ":00";
        const horaResolucion = req.body.HoraResolucion + ":00";

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


        res.status(200).send('Datos insertados correctamente');
    } catch (err) {
        res.status(500).send('Error al insertar datos: ' + err.message);
    }
}



module.exports = {
    saveDataFormFallas,
    saveDataFormDispositivos,
    obtenerDatosInformes
}