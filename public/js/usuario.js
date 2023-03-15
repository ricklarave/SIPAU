listarUsuarios();

function listarUsuarios(parametroBuscar) {

    $("#cabecera").empty();
    var $cabecera = $("#cabecera");

    var $tr = $("<tr></tr>");
    $tr.append("<th>No</th>");
    $tr.append("<th>Cedula</th>");
    $tr.append("<th>Nombres</th>");
    $tr.append("<th>Apellidos</th>");
    $tr.append("<th>Usuario</th>");
    $tr.append("<th>Clave</th>");
    $tr.append("<th>Perfil</th>");
    $tr.append("<th>Estado</th>");

    $tr.append("<th>Modificar</th>");
    $tr.append("<th>Eliminar</th>");

    $cabecera.append($tr);

    var indice = 1

    if (parametroBuscar == "") {
        $.get("/usuario", function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data[0].length; i++) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + indice + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].cedulausuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].nombresusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].apellidosusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].nick_usuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].claveusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].perfilusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].estadousuario + "</td>");

                $tr.append("<td><button value='" + respuesta.data[0][i].idusuario + "' onclick='modificarUsuario(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[0][i].idusuario + "'  onclick='eliminarusuario(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });

    } else {

        var nombre = document.getElementById("buscarNombre").value;

        $.get("/usuario?parametro=" + nombre, function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data[0].length; i++) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + indice + "</td>");

                $tr.append("<td>" + respuesta.data[0][i].cedulausuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].nombresusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].apellidosusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].nick_usuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].claveusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].perfilusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].estadousuario + "</td>");

                $tr.append("<td><button value='" + respuesta.data[0][i].idusuario + "' onclick='modificarUsuario(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[0][i].idusuario + "'  onclick='eliminarusuario(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });
    }

}



function insertarUsuario() {

    if (document.getElementById("idModal").value != "") {

        var idusuario = document.getElementById("idModal").value;
        var cedulaUsuario = document.getElementById("cedulaUsuario").value;
        var nombresUsuario = document.getElementById("nombresUsuario").value;
        var apellidosUsuario = document.getElementById("apellidosUsuario").value;
        var nick_Usuario = document.getElementById("nick_Usuario").value;
        var claveUsuario = document.getElementById("claveUsuario").value;
        var perfilUsuario = document.getElementById("perfilUsuario").value;
        var estadoUsuario = document.getElementById("estadoUsuario").value;

        var data =
        {
            "idusuario": idusuario,
            "cedulaUsuario": cedulaUsuario,
            "nombresUsuario": nombresUsuario,
            "apellidosUsuario": apellidosUsuario,
            "nick_Usuario": nick_Usuario,
            "claveUsuario": claveUsuario,
            "perfilUsuario": perfilUsuario,
            "estadoUsuario": estadoUsuario,
        }

        $.ajax({
            url: "/usuario",
            type: "PUT",
            data: data,
            success: function (result, status) {
                if (status == "success") {
                    listarUsuarios();
                    limpiarFormulario();
                    alert("Usuario Actualizado");
                } else {
                    alert("Error al actualizar al Usuario")
                }
            },
        });

        listarUsuarios();

    } else {

        var cedulaUsuario = document.getElementById("cedulaUsuario").value;
        var nombresUsuario = document.getElementById("nombresUsuario").value;
        var apellidosUsuario = document.getElementById("apellidosUsuario").value;
        var nick_Usuario = document.getElementById("nick_Usuario").value;
        var claveUsuario = document.getElementById("claveUsuario").value;
        var perfilUsuario = document.getElementById("perfilUsuario").value;
        var estadoUsuario = document.getElementById("estadoUsuario").value;

        var data =
        {
            "cedulaUsuario": cedulaUsuario,
            "nombresUsuario": nombresUsuario,
            "apellidosUsuario": apellidosUsuario,
            "nick_Usuario": nick_Usuario,
            "claveUsuario": claveUsuario,
            "perfilUsuario": perfilUsuario,
            "estadoUsuario": estadoUsuario,
        }

        $.post("/usuario", data, function (data, status) {

            if (status == "success") {
                listarUsuarios();

                alert("Usuario Guardado");
            } else {
                alert("Error al registrar al Usuario")
            }
        });
    }
}


function modificarUsuario(parametro) {

    document.getElementById("cedula_tabla").options.length = 0;
    $.get("/usuario?parametro=" + parametro.value, function (respuesta) {

        for (let i = 0; i < respuesta.data[0].length; i++) {
            document.getElementById("idModal").value = respuesta.data[0][i].idusuario;
            document.getElementById("cedulaUsuario").value = respuesta.data[0][i].cedulausuario;
            document.getElementById("nombresUsuario").value = respuesta.data[0][i].nombresusuario;
            document.getElementById("apellidosUsuario").value = respuesta.data[0][i].apellidosusuario;
            document.getElementById("nick_Usuario").value = respuesta.data[0][i].nick_usuario;
            document.getElementById("claveUsuario").value = respuesta.data[0][i].claveusuario;
            document.getElementById("perfilUsuario").value = respuesta.data[0][i].perfilusuario;
            document.getElementById("estadoUsuario").value = respuesta.data[0][i].estadousuario;
        }

    });
}

function buscarUsuario() {
    var cedulaUsuario = document.getElementById("cedulaUsuario").value
    var cedula_tabla = document.getElementById('cedula_tabla')

    $.get("http://localhost:3000/usuario?parametro=" + cedulaUsuario + "*", function (data, status) {

        mostrarCedulas(data, cedula_tabla)

    });
}


function mostrarCedulas(arreglo, lugar) {
    let elementos = '<option selected disabled>--Seleccione--</option>'

    for (let i = 0; i < arreglo.data[0].length; i++) {
        elementos += '<option value="' + arreglo.data[0][i].ceduladueño + '">' + 'Dueño: ' + arreglo.data[0][i].ceduladueño + '</option>'
    }

    for (let i = 0; i < arreglo.data[1].length; i++) {
        elementos += '<option value="' + arreglo.data[1][i].cedularesidente + '">' + 'Residente: ' + arreglo.data[1][i].cedularesidente + '</option>'
    }

    for (let i = 0; i < arreglo.data[2].length; i++) {
        elementos += '<option value="' + arreglo.data[2][i].cedulaadministrador + '">' + 'Administrador: ' + arreglo.data[2][i].cedulaadministrador + '</option>'
    }

    lugar.innerHTML = elementos
}

function cargarNomApellido() {

    var cedulatabla = document.getElementById("cedula_tabla").value

    document.getElementById("cedulaUsuario").value = cedulatabla

    $.get("http://localhost:3000/usuario?parametro=" + cedulatabla, function (data, status) {


        for (let i = 0; i < data.data[0].length; i++) {
            document.getElementById("nombresUsuario").value = data.data[0][i].nombresdueño
            document.getElementById("apellidosUsuario").value = data.data[0][i].apellidosdueño
        }


        for (let i = 0; i < data.data[1].length; i++) {
            document.getElementById("nombresUsuario").value = data.data[1][i].nombresresidente
            document.getElementById("apellidosUsuario").value = data.data[1][i].apellidosresidente
        }

        for (let i = 0; i < data.data[2].length; i++) {
            document.getElementById("nombresUsuario").value = data.data[2][i].nombresadministrador
            document.getElementById("apellidosUsuario").value = data.data[2][i].apellidosadministrador
        }
    });
}



function eliminarusuario(parametro) {

    var data = { "idusuario": parametro.value }

    $.ajax({
        url: "/usuario",
        type: "DELETE",
        data: data,
        success: function (result, status) {

            if (status == "success") {
                listarUsuarios();
                limpiarFormulario();
                alert("Usuario Eliminado");
            } else {
                alert("Error al eliminar el Usuario")
            }
        },
    });
}

function limpiarFormulario() {
    document.getElementById("idModal").value = "";
    document.getElementById("cedulaUsuario").value = "";
    document.getElementById("nombresUsuario").value = "";
    document.getElementById("apellidosUsuario").value = "";
    document.getElementById("nick_Usuario").value = "";
    document.getElementById("claveUsuario").value = "";
    document.getElementById("perfilUsuario").value = "";
    document.getElementById("estadoUsuario").value = "";
    document.getElementById("cedula_tabla").options.length = 0;
}


// Validaciones
function soloNumeros(e) {
    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = "0123456789";
        especiales = [8, 37, 39, 46]; //8 es espacio 37 es tecla derecha 39 es tecla izquierda y 46 es delete

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}

function soloLetras(e) {
    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = "asdfghjklqwert yuiopzxcvbnmñ";
        especiales = [8, 37, 39, 46]; //8 es espacio 37 es tecla derecha 39 es tecla izquierda y 46 es delete

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}

function soloNumLetras(e) {
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = " abcdefghijklmnñopqrstuvwxyz0123456789";
        especiales = [8, 37, 39, 46]; //8 es espacio 37 es tecla derecha 39 es tecla izquierda y 46 es delete

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}

function soloClave(e) {
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = "abcdefghijklmnñopqrstuvwxyz0123456789";
        especiales = [8, 37, 39, 46]; //8 es espacio 37 es tecla derecha 39 es tecla izquierda y 46 es delete

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}

function rangoClave() {
    var val = document.getElementById("claveUsuario").value;
    var tam = val.length;
    if (tam >= 1 && tam <= 4) {
        alert("Error ingrese mas de 4 caracteres")
        document.getElementById("claveUsuario").value = '';
        document.getElementById("claveUsuario").focus();
    }
}

espacios = function (input) {
    if (event.keyCode == 32) {
        input.value = input.value.replace('  ', ' ');//sustituimos dos espacios seguidos por uno 
    }
}

function Salir() {

    window.open("http://localhost:3000/html/menuAdministrador.html"); //
    window.close("http://localhost:3000/html/usuario.html");

}