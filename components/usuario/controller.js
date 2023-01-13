const storage = require('./storage')

function get_residente( filtro_residente ) {
    
    return new Promise((resolve, reject) => {
        
        resolve( storage.get( filtro_residente ) )      
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



module.exports = {
    get_residente,
    add_usuario,
}