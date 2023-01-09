const storage = require('./storage')

function get_administrador( filtro_administrador ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_administrador ) )
    })
}

function add_administrador( administrador ) {
    return new Promise((resolve, reject) => {
        if (!administrador.cedula || !administrador.nombresAdministrador || !administrador.apellidosAdministrador) {
            return reject('Complete todos los campos.')
        }
        storage.add( administrador )
        resolve( administrador )        
    })
}

function update_administrador( administrador ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( administrador )
        if (resultado) {
            return resolve( administrador )
        } else {
            return reject('No existe el administrador.')
        }
    })
}

function delete_administrador( administrador ) {
    return new Promise((resolve, reject) => {
        storage.delete( administrador )
        resolve( administrador )
    })
}

module.exports = {
    get_administrador,
    add_administrador,
    update_administrador,
    delete_administrador,
}
