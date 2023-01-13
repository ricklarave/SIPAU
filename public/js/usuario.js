function insertarUsuario() {

    var cedulaUsuario = document.getElementById("cedulaUsuario").value;
    var nombresUsuario = document.getElementById("nombresUsuario").value;
    var apellidosUsuario = document.getElementById("apellidosUsuario").value;
    var nick_Usuario = document.getElementById("nick_Usuario").value;
    var claveUsuario = document.getElementById("claveUsuario").value;
    var perfilUsuario = document.getElementById("perfilUsuario").value;
    var estadoUsuario = document.getElementById("estadoUsuario").value;

    var data2 =
    {
        "cedulaUsuario": cedulaUsuario,
        "nombresUsuario": nombresUsuario,
        "apellidosUsuario": apellidosUsuario,
        "nick_Usuario": nick_Usuario,
        "claveUsuario": claveUsuario,
        "perfilUsuario": perfilUsuario,
        "estadoUsuario": estadoUsuario,
    }

    console.log(data2)

    $.post("http://localhost:3000/usuario", data2, function (data2, status) {
        console.log("Data: " + data2 + "\nStatus: " + status);
    });

    listarUsuarios();

}


function buscarusuario() {
    var cedulaUsuario = document.getElementById("cedulaUsuario").value
    var cedula_tabla = document.getElementById('cedula_tabla')
    console.log(cedulaUsuario)
    $.get("http://localhost:3000/usuario?parametro=" + cedulaUsuario, function (data, status) {

        mostrarCedulas(data, cedula_tabla)

    });
}


function mostrarCedulas(arreglo, lugar) {
    let elementos = '<option selected disabled>--Seleccione--</option>'
                    
                        
    for (let i = 0; i < arreglo.data[0].length; i++) {
        elementos += '<option value="' + arreglo.data[0][i].ceduladueño + '">' + 'Dueño: ' + arreglo.data[0][i].ceduladueño + '</option>'
    }

    for (let i = 0; i < arreglo.data[1].length; i++) {
        elementos += '<option value="' + arreglo.data[1][i].cedularesidente + '">' + 'residente: ' + arreglo.data[1][i].cedularesidente + '</option>'                                          
    }

    lugar.innerHTML = elementos
}

function cargarNomApellido() {
    
    var cedulatabla = document.getElementById("cedula_tabla").value
    console.log("cedula usuario: "+cedulatabla)
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
    });
}



////////////////////////////////////////
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

    if (parametroBuscar != "") {
        $.get("/usuario", function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");
            
            for (let i = 0; i < respuesta.data[0].length; i++) {
                
                console.log(i + " < " + respuesta.data[0].length)
                var $tr = $("<tr></tr>");
                $tr.append("<td>" + indice + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].cedulausuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].nombresusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].apellidosusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].nick_usuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].claveusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].perfilusuario + "</td>");
                $tr.append("<td>" + respuesta.data[0][i].estadousuario + "</td>");

                $tr.append("<td><button value='" + respuesta.data[0][i].idusuario + "' onclick='modificarusuario(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[0][i].idusuario + "'  onclick='eliminarusuario(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });

    } else {
       
        var cedula = document.getElementById("buscarCedula").value;

        $.get("/usuario?parametro=" + cedula, function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data.length; i++) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + indice + "</td>");
 
                $tr.append("<td>" + respuesta.data[i].cedulausuario + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresusuario + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosusuario + "</td>");
                $tr.append("<td>" + respuesta.data[i].nick_usuario + "</td>");
                $tr.append("<td>" + respuesta.data[i].claveusuario + "</td>");
                $tr.append("<td>" + respuesta.data[i].perfilusuario + "</td>");
                $tr.append("<td>" + respuesta.data[i].estadousuario + "</td>");

                $tr.append("<td><button value='" + respuesta.data[i].idusuario + "' onclick='modificarusuario(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[i].idusuario + "'  onclick='eliminarusuario(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });
    }

}


function modificarusuario(parametro) {

    $.get("/usuario?parametro=" + parametro.value, function (respuesta) {

        document.getElementById("nick_usario").value = respuesta.data[0].nick_usario;
        document.getElementById("claveusuario").value = respuesta.data[0].claveusuario;
        document.getElementById("perfilusuario").value = respuesta.data[0].villa;
        document.getElementById("estadousuario").value = respuesta.data[0].ceduladueño;
        

    });

}

function eliminarusuario(parametro) {

    var data = { "idusuario": parametro.value }

    $.ajax({
        url: "/usuario",
        type: "DELETE",
        data: data,
        success: function (result, status) {
            console.log(status);
        },
    });

    listarUsuarios();

}

function limpiarFormulario() {
    document.getElementById("cedulaUsuario").value = "";
    document.getElementById("nombresUsuario").value = "";
    document.getElementById("apellidosUsuario").value = "";
    document.getElementById("nick_Usuario").value = "";
    document.getElementById("claveUsuario").value = "";
    document.getElementById("perfilUsuario").value = "";
    document.getElementById("estadoUsuario").value = "";


}

