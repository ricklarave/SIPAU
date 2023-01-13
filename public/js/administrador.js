listarAdministrador();

function listarAdministrador(parametroBuscar) {

    $("#cabecera").empty();
    var $cabecera = $("#cabecera");

    var $tr = $("<tr></tr>");
    $tr.append("<th>Id</th>");
    $tr.append("<th>Cedula</th>");
    $tr.append("<th>Nombres</th>");
    $tr.append("<th>Apellidos</th>");
    $tr.append("<th>Modificar</th>");
    $tr.append("<th>Eliminar</th>");

    $cabecera.append($tr);

    var indice = 1

    if (parametroBuscar == "") {
        $.get("/administrador", function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data.length; i++) {

                var $tr = $("<tr></tr>");

                $tr.append("<td>" + indice + "</td>");
                $tr.append("<td>" + respuesta.data[i].cedulaadministrador + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresadministrador + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosadministrador + "</td>");

                console.log(respuesta.data[i].idadministrador+ "METODO LISTAR" );
                $tr.append("<td><button value='" + respuesta.data[i].idadministrador + "' onclick='modificarAdministrador(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[i].idadministrador + "'  onclick='eliminarAdministrador(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });

    } else {

        var nombre = document.getElementById("buscarAdministrador").value;

        $.get("/administrador?parametro=" + nombre, function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data.length; i++) {
                var $tr = $("<tr></tr>");

                $tr.append("<td>" + indice + "</td>");
                $tr.append("<td>" + respuesta.data[i].cedulaadministrador + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresadministrador + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosadministrador + "</td>");


                $tr.append("<td><button value='" + respuesta.data[i].idadministrador + "' onclick='modificarAdministrador(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[i].idadministrador + "'  onclick='eliminarAdministrador(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });
    }

}

function insertarAdministrador() {

    if (document.getElementById("idModal").value != "") {

        var idadministrador = document.getElementById("idModal").value;
        var cedula = document.getElementById("cedula").value;
        var nombres = document.getElementById("nombres").value;
        var apellidos = document.getElementById("apellidos").value;

        var data =
        {
            "idadministrador": idadministrador,
            "cedulaadministrador": cedula,
            "nombresadministrador": nombres,
            "apellidosadministrador": apellidos
        }

        $.ajax({
            url: "/administrador",
            type: "PUT",
            data: data,
            success: function (result, status) {
                console.log(status);
            },
        });

        listarAdministrador();

    } else {

        console.log("Post")

        var cedula = document.getElementById("cedula").value;
        var nombres = document.getElementById("nombres").value;
        var apellidos = document.getElementById("apellidos").value;

        var data =
        {
            "cedulaadministrador": cedula,
            "nombresadministrador": nombres,
            "apellidosadministrador": apellidos

        }

        $.post("/administrador", data, function (data, status) {
            listarAdministrador();
            if (status == "success") {
                limpiarFormulario();
                alert("Status: " + status);
            } else {
                alert("Error al registrar el Administrador")
            }

        });

    }

}

function modificarAdministrador(parametro) {
    console.log(parametro.value)
    $.get("/administrador?parametro=" + parametro.value, function (respuesta) {

        document.getElementById("idModal").value = respuesta.data[0].idadministrador;
        document.getElementById("cedula").value = respuesta.data[0].cedulaadministrador;
        document.getElementById("nombres").value = respuesta.data[0].nombresadministrador;
        document.getElementById("apellidos").value = respuesta.data[0].apellidosadministrador;

    });

}

function eliminarAdministrador(parametro) {

    var data = { "idadministrador": parametro.value }

    $.ajax({
        url: "/administrador",
        type: "DELETE",
        data: data,
        success: function (result, status) {
            console.log(status);
        },
    });

    listarAdministrador();

}

function limpiarFormulario() {

    document.getElementById("idModal").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";

}