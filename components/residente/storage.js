const pool = require('./../../bd')

async function get_residente(filtro_residente) {

    let results = null

    if (!isNaN(filtro_residente)) {       //TRUE=> VACIO || INT
        if (filtro_residente == "") {    //Vacio
            
            filtro_residente = filtro_residente || null;
            results = await pool.query('SELECT * FROM residente')

        } else {                            //INT
            filtro_residente = parseInt(filtro_residente);
            results = await pool.query('SELECT * FROM residente WHERE idresidente = $1', [filtro_residente])
        }
    }
    else if (isNaN(filtro_residente)) { //FALSE=> STRING
        filtro_residente = String(filtro_residente);
        // results = await pool.query('SELECT * FROM residente WHERE nombresDueño = $1', [filtro_residente])
        results = await pool.query("SELECT * FROM residente WHERE nombresDueño like '"+ filtro_residente +"%'")
    }


    return results.rows
}

async function add_residente(residente) {
    console.log(residente.fechaAlquiler +'storage')
    let results = await pool.query('INSERT INTO residente(manzana, villa, cedulaDueño, nombresDueño, apellidosDueño, cedulaResidente, nombresResidente, apellidosResidente, telefonoResidente, correoResidente, fechaAlquiler) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [residente.manzana, residente.villa, residente.cedulaDueño, residente.nombresDueño, residente.apellidosDueño, residente.cedulaResidente, residente.nombresResidente, residente.apellidosResidente, residente.telefonoResidente, residente.correoResidente, residente.fechaAlquiler])
    return residente
}

async function update_residente(residente) {
    let results = await pool.query('UPDATE residente SET manzana=$2, villa=$3, ceduladueño=$4, nombresdueño=$5, apellidosdueño=$6, cedularesidente=$7, nombresresidente=$8, apellidosresidente=$9, telefonoresidente=$10, correoresidente=$11, fechaalquiler=$12 WHERE idresidente=$1', [residente.idresidente, residente.manzana, residente.villa, residente.cedulaDueño, residente.nombresDueño, residente.apellidosDueño, residente.cedulaResidente, residente.nombresResidente, residente.apellidosResidente, residente.telefonoResidente, residente.correoResidente, residente.fechaAlquiler])
    return residente
}

async function delete_residente(residente) {
    let results = await pool.query('DELETE FROM residente WHERE idresidente=$1', [residente])
    return residente
}

module.exports = {
    add: add_residente,
    get: get_residente,
    update: update_residente,
    delete: delete_residente,
}
