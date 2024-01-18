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
    joder
}

//configurar la conexion lista para interactuar con la base de datos
const pool = new sql.ConnectionPool(config)

//Conecta el pool con la base de datos
pool.connect()

//

module.exports = pool

