const sql = require('mssql')


const config = {
    user: 'adminsql',
    password: 'Megalodon_2001',
    server: 'servidortestsql.database.windows.net',
    database: 'BDTest',
    options: {
        encrypt: true, // Si estás en Azure, suele ser necesario
    },
}


const pool = new sql.ConnectionPool(config)

pool.connect()


module.exports = pool