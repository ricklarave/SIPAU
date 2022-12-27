const storage = require('./storage')

function get_residente( filtro_residente ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_residente ) )
    })
}

function add_residente( residente ) {
    return new Promise((resolve, reject) => {
        if (!residente.manzana || !residente.villa || !residente.cedulaDueño || 
            !residente.nombresDueño || !residente.apellidosDueño || !residente.cedulaResidente || 
            !residente.nombresResidente || !residente.apellidosResidente || !residente.telefonoResidente || 
            !residente.correoResidente || !residente.fechaAlquiler) {
            return reject('Complete todos los campos.')
        }
        storage.add( residente )
        resolve( residente )        
    })
}

// function update_residente( residente ) {
//     return new Promise((resolve, reject) => {
//         let resultado = storage.update( residente )
//         if (resultado) {
//             return resolve( residente )
//         } else {
//             return reject('No existe el residente.')
//         }
//     })
// }

function delete_residente( residente ) {
    return new Promise((resolve, reject) => {
        storage.delete( residente )
        resolve( residente )
    })
}

module.exports = {
    get_residente,
    add_residente,
    // update_residente,
    delete_residente,
}