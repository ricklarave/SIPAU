const pool = require('./../../bd')

async function get_usuario(filtro_usuario) {

    var results = null;
    var results2 = null;
    var results3 = null;
    var prueba = [];
    console.log("filtro_usuario /storage: "+filtro_usuario)
    if (!isNaN(filtro_usuario) ) {
        if (filtro_usuario == "") {
            results = await pool.query('SELECT * FROM usuario')
            prueba = [results.rows]

        } else if (filtro_usuario.charAt(filtro_usuario.indexOf("0")) != "0") {
            filtro_usuario = parseInt(filtro_usuario);
            
            results = await pool.query('SELECT * FROM usuario WHERE idusuario = $1', [filtro_usuario])
            prueba = [results.rows]

        } else{
            results = await pool.query('SELECT ceduladueño, nombresdueño, apellidosdueño FROM residente WHERE ceduladueño LIKE $1 ', ['%' + filtro_usuario + '%']);
            results2 = await pool.query('SELECT cedularesidente, nombresresidente, apellidosresidente FROM residente WHERE cedularesidente LIKE $1 ', ['%' + filtro_usuario + '%']);
            results3 = await pool.query('SELECT cedulaadministrador, nombresadministrador, apellidosadministrador FROM administrador WHERE cedulaadministrador LIKE $1 ', ['%' + filtro_usuario + '%']);
            prueba = [results.rows, results2.rows, results3.rows]

        }
        

    } else {

        if (filtro_usuario.charAt(filtro_usuario.indexOf("*")) == "*") {
            var str = filtro_usuario;
            str = str.substring(0, str.length - 1);
          
            results = await pool.query('SELECT ceduladueño, nombresdueño, apellidosdueño FROM residente WHERE ceduladueño LIKE $1 ', ['%' + str + '%']);
            results2 = await pool.query('SELECT cedularesidente, nombresresidente, apellidosresidente FROM residente WHERE cedularesidente LIKE $1 ', ['%' + str + '%']);
            results3 = await pool.query('SELECT cedulaadministrador, nombresadministrador, apellidosadministrador FROM administrador WHERE cedulaadministrador LIKE $1 ', ['%' + str + '%']);
            prueba = [results.rows, results2.rows, results3.rows]
            

        } else {
            console.log("4")
            filtro_usuario = String(filtro_usuario);
            results = await pool.query("SELECT * FROM usuario WHERE nombresusuario like  '" + filtro_usuario + "%'")
            prueba = [results.rows]
        }
    }
    return prueba
}




async function add_usuario(usuario) {

    let results = await pool.query('INSERT INTO usuario( cedulausuario, nombresusuario, apellidosusuario, nick_usuario, claveusuario, perfilusuario, estadousuario) VALUES ($1, $2, $3, $4, $5, $6, $7)', [usuario.cedulaUsuario, usuario.nombresUsuario, usuario.apellidosUsuario, usuario.nick_Usuario, usuario.claveUsuario, usuario.perfilUsuario, usuario.estadoUsuario])

    return usuario
}

async function update_usuario(usuario) {
    let results = await pool.query('UPDATE usuario SET cedulausuario=$2, nombresusuario=$3, apellidosusuario=$4, nick_usuario=$5, claveusuario=$6, perfilusuario=$7, estadousuario=$8 WHERE idusuario=$1', [usuario.idusuario, usuario.cedulaUsuario, usuario.nombresUsuario, usuario.apellidosUsuario, usuario.nick_Usuario, usuario.claveUsuario, usuario.perfilUsuario, usuario.estadoUsuario])
    
    return usuario
}

async function delete_usuario(usuario) {
    let results = await pool.query('DELETE FROM usuario WHERE idusuario=$1', [usuario])
    return usuario
}


module.exports = {
    add: add_usuario,
    get: get_usuario,
    update: update_usuario,
    delete: delete_usuario,

}