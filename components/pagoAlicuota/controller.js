const storage = require('./storage')

function get_pagoAlicuota( filtro_pagoAlicuota ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_pagoAlicuota ) )
    })
}

function add_pagoAlicuota( pagoAlicuota ) {
    return new Promise((resolve, reject) => {
        if (!pagoAlicuota.idresidente || !pagoAlicuota.anio || !pagoAlicuota.mes || 
            !pagoAlicuota.fechapago || !pagoAlicuota.valor || !pagoAlicuota.estado) {
            return reject('Complete todos los campos.')
        }
        storage.add( pagoAlicuota )
        resolve( pagoAlicuota )        
    })
}

function update_pagoAlicuota( pagoAlicuota ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( pagoAlicuota )
        if (resultado) {
            return resolve( pagoAlicuota )
        } else {
            return reject('No existe el pado de Alicuota.')
        }
    })
}

function delete_pagoAlicuota( pagoAlicuota ) {
    return new Promise((resolve, reject) => {
        storage.delete( pagoAlicuota )
        resolve( pagoAlicuota )
    })
}

module.exports = {
    get_pagoAlicuota,
    add_pagoAlicuota,
    update_pagoAlicuota,
    delete_pagoAlicuota,
}