const pool = require('./../../bd')

async function get_administrador( filtro_administrador ) {
    console.log("entra a get administrador del storage")
    let results = null
    if (filtro_administrador) {
        results = await pool.query('SELECT * FROM administrador WHERE cedulaadministrador LIKE $1', [ '%' + filtro_administrador + '%' ])
    } else {
        results = await pool.query('SELECT * FROM administrador')
    }
    console.log(results.rows)
    return results.rows
}


async function add_administrador( administrador ) {
    let results = await pool.query('INSERT INTO administrador(cedulaadministrador, nombresadministrador, apellidosadministrador) VALUES ($1, $2, $3)',[administrador.cedulaadministrador,administrador.nombresadministrador, administrador.apellidosadministrador])
    return administrador
}

async function update_administrador( administrador ) {
    let results = await pool.query('UPDATE administrador SET cedulaadministrador=$2, nombresadministrador=$3, apellidosadministrador=$4 WHERE idadministrador=$1', [administrador.idadministrador,administrador.cedulaadministrador, administrador.nombresadministrador, administrador.apellidosadministrador ])
    
    return administrador
}

async function delete_administrador( administrador ) {
    let results = await pool.query('DELETE FROM administrador WHERE idadministrador=$1', [administrador])
    return administrador
}

module.exports = {
    add: add_administrador,
    get: get_administrador,
    update: update_administrador,
    delete: delete_administrador,
}
