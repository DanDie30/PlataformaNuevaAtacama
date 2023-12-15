const sql = require('mssql')
const pool = require('../utils/db')

const obtenerRecuentoEventosPorMesCopiapo = async (req, res) => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN MONTH(Fecha) = 1 THEN 'Enero'
          WHEN MONTH(Fecha) = 2 THEN 'Febrero'
          WHEN MONTH(Fecha) = 3 THEN 'Marzo'
          WHEN MONTH(Fecha) = 4 THEN 'Abril'
          WHEN MONTH(Fecha) = 5 THEN 'Mayo'
          WHEN MONTH(Fecha) = 6 THEN 'Junio'
          WHEN MONTH(Fecha) = 7 THEN 'Julio'
          WHEN MONTH(Fecha) = 8 THEN 'Agosto'
          WHEN MONTH(Fecha) = 9 THEN 'Septiembre'
          WHEN MONTH(Fecha) = 10 THEN 'Octubre'
          WHEN MONTH(Fecha) = 11 THEN 'Noviembre'
          WHEN MONTH(Fecha) = 12 THEN 'Diciembre'
          ELSE 'Mes Desconocido'
        END AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 1
      GROUP BY MONTH(Fecha)
      ORDER BY MONTH(Fecha);
    `;
    
    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const labels = result.recordset.map(row => row.Mes);
      const data = result.recordset.map(row => row.CantidadEventos);

      res.status(200).json({ labels, data });
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el recuento de eventos por mes: ' + err.message);
    console.error(err.message);
  }
};

const obtenerRecuentoEventosPorMesVallenar = async (req, res) => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN MONTH(Fecha) = 1 THEN 'Enero'
          WHEN MONTH(Fecha) = 2 THEN 'Febrero'
          WHEN MONTH(Fecha) = 3 THEN 'Marzo'
          WHEN MONTH(Fecha) = 4 THEN 'Abril'
          WHEN MONTH(Fecha) = 5 THEN 'Mayo'
          WHEN MONTH(Fecha) = 6 THEN 'Junio'
          WHEN MONTH(Fecha) = 7 THEN 'Julio'
          WHEN MONTH(Fecha) = 8 THEN 'Agosto'
          WHEN MONTH(Fecha) = 9 THEN 'Septiembre'
          WHEN MONTH(Fecha) = 10 THEN 'Octubre'
          WHEN MONTH(Fecha) = 11 THEN 'Noviembre'
          WHEN MONTH(Fecha) = 12 THEN 'Diciembre'
          ELSE 'Mes Desconocido'
        END AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 3
      GROUP BY MONTH(Fecha)
      ORDER BY MONTH(Fecha);
    `;
    
    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const labels = result.recordset.map(row => row.Mes);
      const data = result.recordset.map(row => row.CantidadEventos);

      res.status(200).json({ labels, data });
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el recuento de eventos por mes: ' + err.message);
    console.error(err.message);
  }
};

const obtenerRecuentoEventosPorMesChanaral = async (req, res) => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN MONTH(Fecha) = 1 THEN 'Enero'
          WHEN MONTH(Fecha) = 2 THEN 'Febrero'
          WHEN MONTH(Fecha) = 3 THEN 'Marzo'
          WHEN MONTH(Fecha) = 4 THEN 'Abril'
          WHEN MONTH(Fecha) = 5 THEN 'Mayo'
          WHEN MONTH(Fecha) = 6 THEN 'Junio'
          WHEN MONTH(Fecha) = 7 THEN 'Julio'
          WHEN MONTH(Fecha) = 8 THEN 'Agosto'
          WHEN MONTH(Fecha) = 9 THEN 'Septiembre'
          WHEN MONTH(Fecha) = 10 THEN 'Octubre'
          WHEN MONTH(Fecha) = 11 THEN 'Noviembre'
          WHEN MONTH(Fecha) = 12 THEN 'Diciembre'
          ELSE 'Mes Desconocido'
        END AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 2
      GROUP BY MONTH(Fecha)
      ORDER BY MONTH(Fecha);
    `;
    
    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const labels = result.recordset.map(row => row.Mes);
      const data = result.recordset.map(row => row.CantidadEventos);

      res.status(200).json({ labels, data });
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el recuento de eventos por mes: ' + err.message);
    console.error(err.message);
  }
};



const obtenerRecuentoEventosPorPlantaCopiapo = async (req, res) => {
  try {
    // Consulta SQL para obtener el recuento de eventos por planta (IdPlanta)
    const query = `
      SELECT 
        IdPlanta,
        CASE 
          WHEN IdPlanta = 10 THEN 'Vicuña'
          WHEN IdPlanta = 11 THEN 'Cancha Rayada'
          WHEN IdPlanta = 12 THEN 'Cartavio'
          ELSE 'Planta Desconocida'
        END AS NombrePlanta,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 1
      GROUP BY IdPlanta
      ORDER BY IdPlanta;
    `;

    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const labels = result.recordset.map(row => row.NombrePlanta);
      const data = result.recordset.map(row => row.CantidadEventos);

      res.status(200).json({ labels, data });
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el recuento de eventos por planta: ' + err.message);
    console.error(err.message);
  }
};
const obtenerTresMesesConMasEventosVallenar = async (req, res) => {
  try {
    const query = `
      SELECT TOP 3
        DATENAME(month, Fecha) AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 3
      GROUP BY DATENAME(month, Fecha)
      ORDER BY CantidadEventos DESC
    `;

    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const mesesConMasEventos = result.recordset.map(row => ({
        Mes: row.Mes,
        CantidadEventos: row.CantidadEventos
      }));

      res.status(200).json(mesesConMasEventos);
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener los tres meses con más eventos: ' + err.message);
    console.error(err.message);
  }
};


const obtenerTresMesesConMasEventosChanaral = async (req, res) => {
  try {
    const query = `
      SELECT TOP 3
        DATENAME(month, Fecha) AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 2
      GROUP BY DATENAME(month, Fecha)
      ORDER BY CantidadEventos DESC
    `;

    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const mesesConMasEventos = result.recordset.map(row => ({
        Mes: row.Mes,
        CantidadEventos: row.CantidadEventos
      }));

      res.status(200).json(mesesConMasEventos);
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener los tres meses con más eventos: ' + err.message);
    console.error(err.message);
  }
};


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
    obtenerDatosInformes, 
    obtenerRecuentoEventosPorMesCopiapo,
    obtenerRecuentoEventosPorPlantaCopiapo,
    obtenerRecuentoEventosPorMesVallenar,
    obtenerTresMesesConMasEventosVallenar,
    obtenerRecuentoEventosPorMesChanaral,
    obtenerTresMesesConMasEventosChanaral
}