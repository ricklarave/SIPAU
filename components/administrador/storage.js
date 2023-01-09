const pool = require('./../../bd')

async function get_administrador( filtro_administrador ) {
    let results = null
    if (filtro_administrador) {
        results = await pool.query('SELECT * FROM administrador WHERE cedulaAdministrador LIKE $2', [ '%' + filtro_administrador + '%' ])
    } else {
        results = await pool.query('SELECT * FROM administrador')
    }
    return results.rows
}

async function add_administrador( administrador ) {
    let results = await pool.query('INSERT INTO administrador(cedulaAdministrador, nombresAdministrador, apellidosAdministrador) VALUES ($2, $3, $4)',[administrador.cedulaAdministrador,administrador.nombresAdministrador, administrador.apellidosAdministrador])
    return administrador
}

async function update_administrador( administrador ) {
    let results = await pool.query('UPDATE administrador SET cedulaAdministrador=$2, nombresAdministrador=$3, apellidosAdministrador=$4 WHERE idAdministrador=$1', [administrador.cedulaAdministrador, administrador.nombresAdministrador, administrador.apellidosAdministrador ])
    
    return administrador
}

async function delete_administrador( administrador ) {
    let results = await pool.query('DELETE FROM administrador WHERE idAdministrador=$1', [administrador])
    return administrador
}

module.exports = {
    add: add_administrador,
    get: get_administrador,
    update: update_administrador,
    delete: delete_administrador,
}
