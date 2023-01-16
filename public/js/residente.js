listarResidentes();

function listarResidentes(parametroBuscar) {

    $("#cabecera").empty();
    var $cabecera = $("#cabecera");

    var $tr = $("<tr></tr>");
    $tr.append("<th>No</th>");
    $tr.append("<th>Manzana</th>");
    $tr.append("<th>Villa</th>");
    $tr.append("<th>Cedula Dueño</th>");
    $tr.append("<th>Nombres Dueño</th>");
    $tr.append("<th>Apellidos Dueño</th>");
    $tr.append("<th>Cedula Residente</th>");
    $tr.append("<th>Nombres Residente</th>");
    $tr.append("<th>Apellidos Residente</th>");
    $tr.append("<th>Telefono Residente</th>");
    $tr.append("<th>Correo Residente</th>");
    $tr.append("<th>Fecha Alquiler</th>");
    $tr.append("<th>Modificar</th>");
    $tr.append("<th>Eliminar</th>");

    $cabecera.append($tr);

    var indice = 1

    if (parametroBuscar == "") {
        $.get("/residente", function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data.length; i++) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + indice + "</td>");
                $tr.append("<td>" + respuesta.data[i].manzana + "</td>");
                $tr.append("<td>" + respuesta.data[i].villa + "</td>");
                $tr.append("<td>" + respuesta.data[i].ceduladueño + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresdueño + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosdueño + "</td>");
                $tr.append("<td>" + respuesta.data[i].cedularesidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].telefonoresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].correoresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].fechaalquiler + "</td>");

                $tr.append("<td><button value='" + respuesta.data[i].idresidente + "' onclick='modificarResidente(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[i].idresidente + "'  onclick='eliminarResidente(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });

    } else {

        var nombre = document.getElementById("buscarNombre").value;

        $.get("/residente?parametro=" + nombre, function (respuesta) {

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            for (let i = 0; i < respuesta.data.length; i++) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + indice + "</td>");
                $tr.append("<td>" + respuesta.data[i].manzana + "</td>");
                $tr.append("<td>" + respuesta.data[i].villa + "</td>");
                $tr.append("<td>" + respuesta.data[i].ceduladueño + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresdueño + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosdueño + "</td>");
                $tr.append("<td>" + respuesta.data[i].cedularesidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].nombresresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].apellidosresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].telefonoresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].correoresidente + "</td>");
                $tr.append("<td>" + respuesta.data[i].fechaalquiler + "</td>");

                $tr.append("<td><button value='" + respuesta.data[i].idresidente + "' onclick='modificarResidente(this)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Modificar</button></td>");
                $tr.append("<td><button type='button' value='" + respuesta.data[i].idresidente + "'  onclick='eliminarResidente(this)' class='btn btn-danger eliminar'>Elminar</button></td>");

                $pantalla.append($tr);

                indice += 1
            }

        });
    }

}

function insertarResidente() {

    if (document.getElementById("idModal").value != "") {

        var idresidente = document.getElementById("idModal").value;
        var manzana = document.getElementById("manzana").value;
        var villa = document.getElementById("villa").value;
        var cedulaDueño = document.getElementById("cedulaDueño").value;
        var nombresDueño = document.getElementById("nombresDueño").value;
        var apellidosDueño = document.getElementById("apellidosDueño").value;
        var cedulaResidente = document.getElementById("cedulaResidente").value;
        var nombresResidente = document.getElementById("nombresResidente").value;
        var apellidosResidente = document.getElementById("apellidosResidente").value;
        var telefonoResidente = document.getElementById("telefonoResidente").value;
        var correoResidente = document.getElementById("correoResidente").value;
        var fechaAlquiler = document.getElementById("fechaAlquiler").value;

        var data =
        {
            "idresidente": idresidente,
            "manzana": manzana,
            "villa": villa,
            "cedulaDueño": cedulaDueño,
            "nombresDueño": nombresDueño,
            "apellidosDueño": apellidosDueño,
            "cedulaResidente": cedulaResidente,
            "nombresResidente": nombresResidente,
            "apellidosResidente": apellidosResidente,
            "telefonoResidente": telefonoResidente,
            "correoResidente": correoResidente,
            "fechaAlquiler": fechaAlquiler
        }

        $.ajax({
            url: "/residente",
            type: "PUT",
            data: data,
            success: function (result, status) {
                if (status == "success") {
                    listarResidentes();
                    limpiarFormulario();
                    alert("Residente Actualizado");
                } else {
                    alert("Error al actualizar el Residente")
                }
            },
        });

        listarResidentes();

    } else {

        var manzana = document.getElementById("manzana").value;
        var villa = document.getElementById("villa").value;
        var cedulaDueño = document.getElementById("cedulaDueño").value;
        var nombresDueño = document.getElementById("nombresDueño").value;
        var apellidosDueño = document.getElementById("apellidosDueño").value;
        var cedulaResidente = document.getElementById("cedulaResidente").value;
        var nombresResidente = document.getElementById("nombresResidente").value;
        var apellidosResidente = document.getElementById("apellidosResidente").value;
        var telefonoResidente = document.getElementById("telefonoResidente").value;
        var correoResidente = document.getElementById("correoResidente").value;
        var fechaAlquiler = document.getElementById("fechaAlquiler").value;

        var data =
        {
            "manzana": manzana,
            "villa": villa,
            "cedulaDueño": cedulaDueño,
            "nombresDueño": nombresDueño,
            "apellidosDueño": apellidosDueño,
            "cedulaResidente": cedulaResidente,
            "nombresResidente": nombresResidente,
            "apellidosResidente": apellidosResidente,
            "telefonoResidente": telefonoResidente,
            "correoResidente": correoResidente,
            "fechaAlquiler": fechaAlquiler
        }

        $.post("/residente", data, function (data, status) {

            if (status == "success") {
                listarResidentes();
                limpiarFormulario();
                alert("Residente Guardado");
            } else {
                alert("Error al registrar el Residente")
            }

        });

    }

}

function modificarResidente(parametro) {

    $.get("/residente?parametro=" + parametro.value, function (respuesta) {

        document.getElementById("idModal").value = respuesta.data[0].idresidente;
        document.getElementById("manzana").value = respuesta.data[0].manzana;
        document.getElementById("villa").value = respuesta.data[0].villa;
        document.getElementById("cedulaDueño").value = respuesta.data[0].ceduladueño;
        document.getElementById("nombresDueño").value = respuesta.data[0].nombresdueño;
        document.getElementById("apellidosDueño").value = respuesta.data[0].apellidosdueño;
        document.getElementById("cedulaResidente").value = respuesta.data[0].cedularesidente;
        document.getElementById("nombresResidente").value = respuesta.data[0].nombresresidente;
        document.getElementById("apellidosResidente").value = respuesta.data[0].apellidosresidente;
        document.getElementById("telefonoResidente").value = respuesta.data[0].telefonoresidente;
        document.getElementById("correoResidente").value = respuesta.data[0].correoresidente;
        document.getElementById("fechaAlquiler").value = respuesta.data[0].fechaalquiler;

    });

}

function eliminarResidente(parametro) {

    var data = { "idresidente": parametro.value }

    $.ajax({
        url: "/residente",
        type: "DELETE",
        data: data,
        success: function (result, status) {
            if (status == "success") {
                listarResidentes();
                limpiarFormulario();
                alert("Residente Eliminado");
            } else {
                alert("Error al eliminar el Residente")
            }
        },
    });

}

function limpiarFormulario() {
    document.getElementById("idModal").value = "";
    document.getElementById("manzana").value = "";
    document.getElementById("villa").value = "";
    document.getElementById("cedulaDueño").value = "";
    document.getElementById("nombresDueño").value = "";
    document.getElementById("apellidosDueño").value = "";
    document.getElementById("cedulaResidente").value = "";
    document.getElementById("nombresResidente").value = "";
    document.getElementById("apellidosResidente").value = "";
    document.getElementById("telefonoResidente").value = "";
    document.getElementById("correoResidente").value = "";
    document.getElementById("fechaAlquiler").value = "";
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
