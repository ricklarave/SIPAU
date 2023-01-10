const storage = require('./storage')

function get_usuario( filtro_usuario ) {
    
    return new Promise((resolve, reject) => {
        
        resolve( storage.get( filtro_usuario ) )  
    })  
}


function add_usuario( usuario ) {
    return new Promise((resolve, reject) => {
        if (!usuario.cedulaUsuario || !usuario.nombresUsuario || !usuario.apellidosUsuario || 
            !usuario.nick_Usuario || !usuario.claveUsuario || 
            !usuario.perfilUsuario || !usuario.estadoUsuario ) {
            return reject('Complete todos los campos.')
        }
        storage.add( usuario )
        resolve( usuario )        
    })
}

function update_usuario( usuario ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( usuario )
        if (resultado) {
            return resolve( usuario )
        } else {
            return reject('No existe el usuario.')
        }
    })
}

function delete_usuario( usuario ) {
    return new Promise((resolve, reject) => {
        storage.delete( usuario )
        resolve( usuario )
    })
}


module.exports = {
    get_usuario,
    add_usuario,
    update_usuario,
    delete_usuario,
}