const sql = require('mssql') //Conexion y manipulacion de la base de datos SQL Server

//Configuracion de la conexion a la bd de Azure SQL Database
const config = {
    user: 'adminsql',
    password: 'Megalodon_2001',
    server: 'servidortestsql.database.windows.net',
    database: 'BDTest',
    options: {
        encrypt: true
    },
}

//configurar la conexion lista para interactuar con la base de datos
const pool = new sql.ConnectionPool(config)

app.listen(port, () => {
    pool.connect().then(() => {
        console.log(`Conectado a la base de datos`);
        console.log(`Aplicacion corriendo en el puerto ${port}`);
    }).catch(err => {
        console.error(`Error al conectar a la base de datos: ${err.message}`);
    });
});


module.exports = pool

