const pool = require('./../../bd')


async function get_residente( filtro_residente ) {
    var results = null;
    var results2 = null;
    var prueba  = [];

    if (filtro_residente) { 
        
        results = await pool.query('SELECT ceduladueño, nombresdueño, apellidosdueño FROM residente WHERE ceduladueño LIKE $1 ', ['%'+filtro_residente+'%'] );
        
        results2 = await pool.query('SELECT cedularesidente, nombresresidente, apellidosresidente FROM residente WHERE cedularesidente LIKE $1 ', ['%'+filtro_residente+'%'] );
        prueba = [results.rows,results2.rows]
    } else {
        results = await pool.query('SELECT * FROM residente')
    }

    return prueba
}


async function add_usuario( usuario ) {
   
    let results = await pool.query('INSERT INTO usuario( cedulaUsuario, nombresUsuario, apellidosUsuario, nick_Usuario, claveUsuario, perfilUsuario, estadoUsuario) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [usuario.cedulaUsuario, usuario.nombresUsuario, usuario.apellidosUsuario, usuario.nick_Usuario, usuario.claveUsuario, usuario.perfilUsuario, usuario.estadoUsuario])
    return usuario
}


module.exports = {
    add: add_usuario,
    get: get_residente,

}