const pool = require('../../bd')

async function get_residente(filtro_residente) {

    let results = null

    if (!isNaN(filtro_residente)) {       //TRUE=> VACIO || INT
        alert("filtro_residente"+filtro_residente)
        if (filtro_residente == "") {    //Vacio
            filtro_residente = filtro_residente || null;
            results = await pool.query('SELECT * FROM residente')
        } else {                            //INT
            filtro_residente = parseInt(filtro_residente);
            results = await pool.query('SELECT * FROM residente WHERE idresidente = $1', [filtro_residente])
        }
    }
    else if (isNaN(filtro_residente)) { //FALSE=> STRING
        alert("filtro_residente "+filtro_residente)
        filtro_residente = String(filtro_residente);
      
        results = await pool.query("SELECT * FROM residente WHERE nombresDueño like '"+ filtro_residente +"%'")
    }

    return results.rows
}

async function add_residente(residente) {
    let results = await pool.query('')
    return residente
}

async function update_residente(residente) {
    let results = await pool.query('')
    return residente
}

async function delete_residente(residente) {
    let results = await pool.query('')
    return residente
}

module.exports = {
    add: add_residente,
    get: get_residente,
    update: update_residente,
    delete: delete_residente,
}
