const pool = require('./../../bd')

async function get_residente( filtro_residente ) {
    let results = null
    if (filtro_residente) {
        results = await pool.query('SELECT * FROM residente WHERE nombre LIKE $1', [ '%' + filtro_residente + '%' ])
    } else {
        results = await pool.query('SELECT * FROM residente')
    }
    return results.rows
}

async function add_residente( residente ) {
    let results = await pool.query('INSERT INTO residente(manzana, villa, cedulaDueño, nombresDueño, apellidosDueño, cedulaResidente, nombresResidente, apellidosResidente, telefonoResidente, correoResidente, fechaAlquiler) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',[residente.manzana, residente.villa, residente.cedulaDueño, residente.nombresDueño, residente.apellidosDueño, residente.cedulaResidente, residente.nombresResidente, residente.apellidosResidente, residente.telefonoResidente, residente.correoResidente, residente.fechaAlquiler])
    return residente
}

// async function update_residente( residente ) {
//     let results = await pool.query('UPDATE residente SET nombre=$1 WHERE residente_id=$2', [residente.nombre, residente.id])
//     return residente
// }

// async function delete_residente( residente ) {
//     let results = await pool.query('DELETE FROM residente WHERE residente_id=$1', [residente.id])
//     console.log(results)
//     return residente
// }

module.exports = {
    add: add_residente,
    get: get_residente,
    // update: update_residente,
    // delete: delete_residente,
}