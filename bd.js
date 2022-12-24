const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SIPAU',
    password: '1234568',
    port: 5432
})

module.exports = pool