const pool = require('./../../bd')

async function get_pagoAlicuota(filtro_pagoAlicuota) {

    let results = null

console.log("****")

    if (!isNaN(filtro_pagoAlicuota)) {       //TRUE=> VACIO || INT
        if (filtro_pagoAlicuota == "") {    //Vacio
            filtro_pagoAlicuota = filtro_pagoAlicuota || null;
            results = await pool.query('SELECT * FROM pagoalicuota WHERE idresidente = $1 ', [filtro_pagoAlicuota])
        
            console.log("----")
        
        } else {                            //INT
            filtro_pagoAlicuota = parseInt(filtro_pagoAlicuota);
            results = await pool.query('SELECT * FROM pagoalicuota WHERE idpago = $1', [filtro_pagoAlicuota])
       
            console.log("++++")

        }
    }
    else if (isNaN(filtro_pagoAlicuota)) { //FALSE=> STRING
        filtro_pagoAlicuota = String(filtro_pagoAlicuota);
        results = await pool.query("SELECT * FROM pagoalicuota WHERE mes like '"+ filtro_pagoAlicuota +"%'")
    
        console.log("/////")

    }

    return results.rows
}

async function add_pagoAlicuota(pagoAlicuota) {
    let results = await pool.query('INSERT INTO pagoalicuota (idresidente, anio, mes, fechapago, valor, estado) VALUES ($1, $2, $3, $4, $5, $6)', [pagoAlicuota.idresidente, pagoAlicuota.anio, pagoAlicuota.mes, pagoAlicuota.fechapago, pagoAlicuota.valor, pagoAlicuota.estado])
    return pagoAlicuota
}

async function update_pagoAlicuota(pagoAlicuota) {
    let results = await pool.query('UPDATE pagoalicuota SET idresidente=$2, anio=$3, mes=$4, fechapago=$5, valor=$6, estado=$7 WHERE idpago=$1', [pagoAlicuota.idpago, pagoAlicuota.idresidente, pagoAlicuota.anio, pagoAlicuota.mes, pagoAlicuota.fechapago, pagoAlicuota.valor, pagoAlicuota.estado])
    return pagoAlicuota
}

async function delete_pagoAlicuota(pagoAlicuota) {
    let results = await pool.query('DELETE FROM pagoalicuota WHERE idpago=$1', [pagoAlicuota])
    return pagoAlicuota
}

module.exports = {
    add: add_pagoAlicuota,
    get: get_pagoAlicuota,
    update: update_pagoAlicuota,
    delete: delete_pagoAlicuota,
}
