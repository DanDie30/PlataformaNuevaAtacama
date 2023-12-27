const sql = require('mssql')
const pool = require('../utils/db')
const path = require('path');

const obtenerEstadoValorBinario = async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const request = pool.request();
    const query = 'SELECT TOP 1  ValorSenal FROM Evento ORDER BY IdEvento DESC;'; 
    const result = await request.query(query);
    if (result.recordset.length > 0) {
      const valorBinario = result.recordset[0].ValorSenal;

      res.status(200).json({ valorBinario });
    } else {
      res.status(404).json({ message: 'No se encontró el valor binario' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estado del valor binario desde la base de datos' });
    console.error('Error en la base de datos:', error);
  }
};
 

const config = {
  user: 'adminsql',
  password: 'Megalodon_2001',
  server: 'servidortestsql.database.windows.net',
  database: 'BDTest',
  options: {
    encrypt: true, // En caso de que estés utilizando conexiones seguras (recomendado para Azure)
    enableArithAbort: true // Habilita el comportamiento recomendado para las conexiones con SQL Server
  }
};

// "Const config" u "Const inicioSesion" funcionan de la mano para que un usuario pueda iniciar sesión
const inicioSesion = async (req, res) => {
  const { NombreUsuario, Clave } = req.body;

  try {
    // Configurar la conexión
    const pool = await sql.connect(config);

    // Consulta SQL con parámetros con nombres
    const request = pool.request();
    request.input('NombreUsuario', sql.NVarChar, NombreUsuario);
    request.input('Clave', sql.NVarChar, Clave);

    const query = 'SELECT NombreUsuario, Rol, Cargo FROM Usuarios WHERE NombreUsuario = @NombreUsuario AND Clave = @Clave';
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      // Verificar si req.session existe y es un objeto
      if (!req.session) {
        req.session = {}; // Inicializar req.session si no existe
      }

      // Establecer la propiedad 'user' en req.session
      req.session.user = {
        NombreUsuario: NombreUsuario,
        Rol: result.recordset[0].Rol,
        Cargo: result.recordset[0].Cargo
        // Agregar más detalles del usuario si es necesario
      };

      // Redirigir al usuario a la página '/index'
      res.redirect('/index');
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en la base de datos' });
    console.error('Error en la base de datos:', error);
  }
};


//Consulta para recuento por mes grafico Copiapo, lineal
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
  WHERE IdSector = 1 AND ValorSenal = 0
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

//Consulta para recuento por planta, grafico principal, Barra
const obtenerRecuentoEventosPorPlanta = async (req, res) => {
  try {
    const query = `
    SELECT 
    P.Nombre_planta AS NombrePlanta,
    COUNT(E.IdEvento) AS CantidadEventos
FROM Evento E
JOIN Planta P ON E.IdPlanta = P.IdPlanta
WHERE ValorSenal = 0
GROUP BY P.Nombre_planta;

    `;

    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const recuentoEventosPorPlanta = result.recordset.map(row => ({
        NombrePlanta: row.NombrePlanta,
        CantidadEventos: row.CantidadEventos
      }));

      res.status(200).json(recuentoEventosPorPlanta);
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el recuento de eventos por planta: ' + err.message);
    console.error(err.message);
  }
};


//Consulta para recuerto total eventos, grafico principal, Lineal
const obtenerRecuentoTotalEventosPorMes = async (req, res) => {
  try {
    const query = `
      SELECT DATENAME(month, Fecha) AS Mes,
             COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE ValorSenal = 0
      GROUP BY DATENAME(month, Fecha)
      ORDER BY CantidadEventos DESC
    `;

    const result = await pool.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const recuentoTotalEventosPorMes = result.recordset.map(row => ({
        Mes: row.Mes,
        CantidadEventos: row.CantidadEventos
      }));

      const labels = recuentoTotalEventosPorMes.map(item => item.Mes);
      const data = recuentoTotalEventosPorMes.map(item => item.CantidadEventos);

      res.status(200).json({ labels, data });
    } else {
      res.status(404).send('No se encontraron resultados');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el recuento total de eventos por mes: ' + err.message);
    console.error(err.message);
  }
};


//Consulta para recuento por mes para Sector Vallenar, Grafico Lineal
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
      WHERE IdSector = 3 AND ValorSenal = 0
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

//Consulta para recuento por mes para Sector Chañaral, Grafico Lineal

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
      WHERE IdSector = 2 AND ValorSenal = 0
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


//Consulta para recuento por planta para Sector Copiapo, Grafico Barra

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
      WHERE IdSector = 1 AND ValorSenal = 0
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

//Consulta para 3 meses que mas han ocurrido Eventos en Sector Vallenar, Grafico Barra
const obtenerTresMesesConMasEventosVallenar = async (req, res) => {
  try {
    const query = `
      SELECT TOP 3
        DATENAME(month, Fecha) AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 3 AND ValorSenal = 0
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


//Consulta para 3 meses que mas han ocurrido Eventos en Sector Chañaral, Grafico Barra

const obtenerTresMesesConMasEventosChanaral = async (req, res) => {
  try {
    const query = `
      SELECT TOP 3
        DATENAME(month, Fecha) AS Mes,
        COUNT(*) AS CantidadEventos
      FROM Evento
      WHERE IdSector = 2 AND ValorSenal = 0
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


//Consulta para obtener datos para tabla en informes, adquirida de la tabla eventos
const obtenerDatosInformes = async (req, res) => {
  try {
    const sectorSeleccionado = req.query.sector;

    const mapeoSectorABD = {
      '1': 'Copiapó',
      '2': 'Chañaral',
      '3': 'Vallenar'
    };

    const mapeoPlantaABD = {
      '10': 'Vicuña',
      '11': 'Cancha Rayada',
      '12': 'Cartavio',
      '13': 'Santa Ines',
      '14': 'El Salado'
    };

    const nombreSector = mapeoSectorABD[sectorSeleccionado];

    if (nombreSector === undefined) {
      return res.status(404).send('Sector seleccionado no válido');
    }

    const query = `
      SELECT 
        TipoFalla, 
        '${nombreSector}' AS NombreSector,
        CASE IdPlanta
          WHEN 10 THEN '${mapeoPlantaABD['10']}'
          WHEN 11 THEN '${mapeoPlantaABD['11']}'
          WHEN 12 THEN '${mapeoPlantaABD['12']}'
          WHEN 13 THEN '${mapeoPlantaABD['13']}'
          WHEN 14 THEN '${mapeoPlantaABD['14']}'
          ELSE ''
        END AS NombrePlanta,
        CONVERT(varchar, FechaDetencion, 23) AS FechaDetencion,
        Descripcion, 
        ResponsableMantenimiento, 
        CONVERT(varchar, HoraDetencion, 108) AS HoraDetencion, 
        CONVERT(varchar, HoraResolucion, 108) AS HoraResolucion, 
        CONVERT(varchar, FechaResolucion, 23) AS FechaResolucion
      FROM MantenimientoFallaDetectada
      WHERE IdSector = ${sectorSeleccionado}
      ORDER BY FechaDetencion DESC
    `;

    const result = await pool.request().query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      let htmlResponse = '<table><thead><tr><th>Tipo Falla</th><th>Nombre Sector</th><th>Nombre Planta</th><th>Fecha Detención</th><th>Hora Detención</th><th>Fecha resolución</th><th>Hora Resolución</th><th>Descripción</th><th>Responsable Mantenimiento</th></tr></thead><tbody>';

      result.recordset.forEach(evento => {
        htmlResponse += `
          <tr>
            <td>${evento.TipoFalla}</td>
            <td>${evento.NombreSector}</td>
            <td>${evento.NombrePlanta}</td>
            <td>${evento.FechaDetencion}</td>
            <td>${evento.HoraDetencion}</td>
            <td>${evento.FechaResolucion}</td>
            <td>${evento.HoraResolucion}</td>
            <td>${evento.Descripcion}</td>
            <td>${evento.ResponsableMantenimiento}</td>
          </tr>
        `;
      });

      htmlResponse += '</tbody></table>';
      res.status(200).send(htmlResponse);
    } else {
      res.status(404).send('No se encontraron eventos para este sector');
    }
  } catch (err) {
    res.status(500).send('Error al obtener los eventos por sector: ' + err.message);
    console.error(err.message);
  }
  };

//Consulta para obtener datos para tabla mantenimiento dispositivos, adquirida de la tabla Mantenimiento Dispositivos
const obtenerDatosDispositivos = async (req, res) => {
  try {
    const sectorSeleccionado = req.query.sector;

    const mapeoSectorABD = {
      '1': 'Copiapó',
      '2': 'Chañaral',
      '3': 'Vallenar'
    };
    const mapeoPlantaABD = {
      '10': 'Vicuña',
      '11': 'Cancha Rayada',
      '12': 'Cartavio',
      '13': 'Santa Ines',
      '14': 'El Salado'
    };
    const nombreSector = mapeoSectorABD[sectorSeleccionado];
    if (nombreSector === undefined) {
      return res.status(404).send('Sector seleccionado no válido');
    }

    const query = `
      SELECT 
      IdSensor,
        '${nombreSector}' AS NombreSector,
        CASE IdPlanta
          WHEN 10 THEN '${mapeoPlantaABD['10']}'
          WHEN 11 THEN '${mapeoPlantaABD['11']}'
          WHEN 12 THEN '${mapeoPlantaABD['12']}'
          WHEN 13 THEN '${mapeoPlantaABD['13']}'
          WHEN 14 THEN '${mapeoPlantaABD['14']}'
          ELSE ''
        END AS NombrePlanta,
        CONVERT(varchar, FechaMantenimiento, 23) AS FechaMantenimiento,
        DescripcionMantenimiento, 
        ResponsableMantenimiento 
      FROM MantenimientoDispositivos
      WHERE IdSector = ${sectorSeleccionado}
      ORDER BY FechaMantenimiento DESC
    `;

    const result = await pool.request().query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      let htmlResponse = '<table><thead><tr><th>Id Sensor</th><th>Nombre Sector</th><th>Nombre Planta</th><th>Fecha Mantenimiento</th></tr></thead><tbody>';

      result.recordset.forEach(evento => {
        htmlResponse += `
          <tr>
            <td>${evento.IdSensor}</td>
            <td>${evento.NombreSector}</td>
            <td>${evento.NombrePlanta}</td>
            <td>${evento.FechaMantenimiento}</td>
            <td>${evento.ResponsableMantenimiento}</td>
            <td>${evento.DescripcionMantenimiento}</td>
          </tr>
        `;
      });
      htmlResponse += '</tbody></table>';
      res.status(200).send(htmlResponse);
    } else {
      res.status(404).send('No se encontraron eventos para este sector');
    }
  } catch (err) {
    console.error('Error al obtener los eventos por sector:', err);

    res.status(500).send('Error al obtener los eventos por sector: ' + err.message);
    console.error(err.message);
  }
  };
  async function validarUsuario(username, password) {
    const usuario = await pool.query(
      `
      SELECT
        NombreUsuario,
        Clave
      FROM
        Usuarios
      WHERE
        NombreUsuario = @username AND
        Clave = @password
      `,
      {
        username,
        password,
      }
    );
    if (usuario.length === 1) {
      return usuario[0];
    } else {
      return null;
    }
  }

  //Consulta para reigstrar datos en la tabla MantenimientoFallas
const saveDataFormFallas = async (req, res) => {
  try {
    const fechaDetencion = req.body.FechaDetencion;

    
    const fechaResolucion = req.body.FechaResolucion;

    const horaDetencion = req.body.HoraDetencion; // Asegúrate de obtener HoraDetencion correctamente
    const horaResolucion = req.body.HoraResolucion; // Asegúrate de obtener HoraDetencion correctamente



    await pool.request()
      .input('TipoFalla', sql.VarChar(255), req.body.TipoFalla)
      .input('IdSector', sql.Int, req.body.IdSector)
      .input('IdPlanta', sql.Int, req.body.IdPlanta)
      .input('FechaDetencion', sql.Date, fechaDetencion)
      .input('Descripcion', sql.VarChar(255), req.body.Descripcion)
      .input('ResponsableMantenimiento', sql.VarChar(255), req.body.ResponsableMantenimiento)
      .input('HoraDetencion', sql.NVarChar, horaDetencion)
      .input('HoraResolucion', sql.NVarChar, horaResolucion)
      .input('FechaResolucion', sql.Date, fechaResolucion)
      .query(`
          INSERT INTO MantenimientoFallaDetectada
          (TipoFalla, IdSector, IdPlanta, FechaDetencion, Descripcion, ResponsableMantenimiento, HoraDetencion, HoraResolucion, FechaResolucion)
          VALUES
          (@TipoFalla, @IdSector, @IdPlanta, @FechaDetencion, @Descripcion, @ResponsableMantenimiento, @HoraDetencion, @HoraResolucion, @FechaResolucion)
      `);

    res.status(200).send('Datos insertados correctamente');
  } catch (err) {
    res.status(500).send('Error al insertar datos: ' + err.message);
    console.log(err.message);
  }

}
//Consulta para obtener datos para tabla en informes, adquirida de la tabla eventos
const obtenerDatosEventos = async (req, res) => {
  try {
    const sectorSeleccionado = req.query.sector;

    const mapeoSectorABD = {
      '1': 'Copiapó',
      '2': 'Chañaral',
      '3': 'Vallenar'
    };

    const mapeoPlantaABD = {
      '10': 'Vicuña',
      '11': 'Cancha Rayada',
      '12': 'Cartavio',
      '13': 'Santa Ines',
      '14': 'El Salado'
    };

    const nombreSector = mapeoSectorABD[sectorSeleccionado];

    if (nombreSector === undefined) {
      return res.status(404).send('Sector seleccionado no válido');
    }

    const query = `
    SELECT TOP 5
    IdSensor, 
    '${nombreSector}' AS NombreSector,
    CASE IdPlanta
        WHEN 10 THEN '${mapeoPlantaABD['10']}'
        WHEN 11 THEN '${mapeoPlantaABD['11']}'
        WHEN 12 THEN '${mapeoPlantaABD['12']}'
        WHEN 13 THEN '${mapeoPlantaABD['13']}'
        WHEN 14 THEN '${mapeoPlantaABD['14']}'
        ELSE ''
    END AS NombrePlanta,
    CONVERT(varchar, Fecha, 23) AS Fecha,
    CONVERT(varchar, Hora, 108) AS Hora, 
    CONVERT(varchar, DuracionDetencion, 108) AS DuracionDetencion 
FROM Evento
WHERE IdSector = ${sectorSeleccionado} AND ValorSenal = 0
ORDER BY Fecha DESC, Hora DESC;
    `;

    const result = await pool.request().query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      let htmlResponse = '<table><thead><tr><th>Id Sensor</th><th>Nombre Sector</th><th>Nombre Planta</th><th>Fecha</th><th>Hora</th><th>Duración Detención</th></tr></thead><tbody>';

      result.recordset.forEach(evento => {
        htmlResponse += `
          <tr>
            <td>${evento.IdSensor}</td>
            <td>${evento.NombreSector}</td>
            <td>${evento.NombrePlanta}</td>
            <td>${evento.Fecha}</td>
            <td>${evento.Hora}</td>
            <td>${evento.DuracionDetencion}</td>
          </tr>
        `;
      });

      htmlResponse += '</tbody></table>';
      res.status(200).send(htmlResponse);
    } else {
      alert('No existen Eventos en este Sector');
      res.status(404).send('No se encontraron eventos para este sector');
    }
  } catch (err) {
    res.status(500).send('Error al obtener los eventos por sector: ' + err.message);
    console.error(err.message);
  }

};

  //Consulta para reigstrar datos en la tabla MantenimientoDispositivos

const saveDataFormDispositivos = async (req, res) => {
  try {
    const { IdSensor, IdSector, IdPlanta, FechaMantenimiento, ResponsableMantenimiento, DescripcionMantenimiento } = req.body;

    await pool.request()
      .input('IdSensor', sql.Int, IdSensor)
      .input('IdSector', sql.Int, IdSector)
      .input('IdPlanta', sql.Int, IdPlanta)
      .input('FechaMantenimiento', sql.Date, FechaMantenimiento)
      .input('ResponsableMantenimiento', sql.NVarChar, ResponsableMantenimiento)
      .input('DescripcionMantenimiento', sql.NVarChar, DescripcionMantenimiento)
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
    obtenerTresMesesConMasEventosChanaral,
    obtenerRecuentoTotalEventosPorMes,
    obtenerRecuentoEventosPorPlanta,
    obtenerDatosDispositivos,
    obtenerDatosEventos,
    inicioSesion,
    obtenerEstadoValorBinario
}