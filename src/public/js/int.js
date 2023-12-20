const axios = require('axios');
const sql = require('mssql');
const config = {
    user: 'adminsql',
    password: 'Megalodon_2001',
    server: 'servidortestsql.database.windows.net',
    database: 'BDTest',
    options: {
        encrypt: true
    }
};
let contando = false;
let inicioConteo = null;
let duracionAcumulada = 0;

async function obtenerDatosThingSpeak() { //Utilizamos la api de thing speak para obtener los campos de fecha, hora, sensor y valor de señal
    try {
        const response = await axios.get('https://api.thingspeak.com/channels/2220274/feeds.json?api_key=9EHD9U70M7TKHT9P&');
        return response.data.feeds;
    } catch (error) {
        console.error('Error al obtener datos de ThingSpeak:', error);
        throw error;
    }
}

async function insertarDatosSQLServer(datos) {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        
        for (let dato of datos) { //Aqui se corta la variable created_at para obtener hora y fecha ya que el thing speak da la hora como timestamp
            const fechaHora = dato.created_at.split("T"); 
            const fecha = fechaHora[0]; 
            const hora = fechaHora[1]; 
            
            if (dato.field1 == 1 && !contando) { //Se inicia el contador el cual a partir de recibir un 0 en la señal cuenta los minutos hasta que se obtenga un 1
                contando = true;
                inicioConteo = new Date(fechaHora.join(" "));
            } else if (dato.field1 == 0 && contando) {
                contando = false;
                const finConteo = new Date(fechaHora.join(" "));
                duracionAcumulada += (finConteo - inicioConteo) / (1000 * 60); 
                //skibidi toilet
                const horas = Math.floor(duracionAcumulada / 60);
                const minutos = Math.floor(duracionAcumulada % 60);
                const segundos = Math.floor((duracionAcumulada - Math.floor(duracionAcumulada)) * 60);
                const tiempoFormateado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

                const query = `
                INSERT INTO Evento (IdSensor, Fecha, Hora, DuracionDetencion, IdSector, Idplanta, ValorSenal)
                VALUES ('30', '${fecha}', '${hora}', '${tiempoFormateado}', '1', '10', 0);
                `;
                await request.query(query);
                duracionAcumulada = 0; 
            } else if (contando) {
                const finConteo = new Date(fechaHora.join(" "));
                duracionAcumulada += (finConteo - inicioConteo) / (1000 * 60); 
                inicioConteo = finConteo; 
            }
            const query = `
            INSERT INTO Evento (IdSensor, Fecha, Hora, DuracionDetencion, IdSector, Idplanta, ValorSenal)
            VALUES ('30', '${fecha}', '${hora}', '00:00:00', '1', '10', ${dato.field1});
            `;
            
            await request.query(query);
        }
        
        await sql.close();
    } catch (error) {
        console.error('Error al insertar datos en SQL Server:', error);
        throw error;
    }
}

async function main() {
    try {
        const datosThingSpeak = await obtenerDatosThingSpeak();
        await insertarDatosSQLServer(datosThingSpeak);
        console.log('Datos insertados correctamente en SQL Server.');
    } catch (error) {
        console.error('Error en el proceso principal:', error);
    }
}
main();
// setInterval() para que se use en x segundos 