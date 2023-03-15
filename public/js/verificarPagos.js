listarResidentes();

function listarResidentes() {

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
    $tr.append("<th style='padding-left: 30px; padding-right: 30px;' >Fecha Alquiler</th>");
    $tr.append("<th>Opcion</th>");


    $cabecera.append($tr);

    var indice = 1

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
            $tr.append("<td>" + respuesta.data[i].fechaalquiler.substring(0, 10) + "</td>"); 

            $tr.append("<td><button value='" + respuesta.data[i].idresidente + "' onclick='verResidente(this); listarPago(1)' class='btn btn-primary modificar' data-toggle='modal' data-target='#fm-modal'>Ver</button></td>");


            $pantalla.append($tr);

            indice += 1
        }

    });
}


function verResidente(parametro) {
  
    $.get("/residente?parametro=" + parametro.value, function (respuesta) {

        document.getElementById("idModal").innerHTML = respuesta.data[0].idusuario;
        document.getElementById('nombresdueño').innerHTML = respuesta.data[0].nombresdueño + ' ' + respuesta.data[0].apellidosdueño;
        document.getElementById("manzana").innerHTML = respuesta.data[0].manzana;

        document.getElementById('fechaalquiler').innerHTML = respuesta.data[0].fechaalquiler.substring(0, 10);
        document.getElementById("villa").innerHTML = respuesta.data[0].villa;

    });
}



function listarPago(idresidente) {

    $("#cabecera2").empty();
    var $cabecera2 = $("#cabecera2");

    var $tr = $("<tr></tr>");
    $tr.append("<th>No</th>");
    $tr.append("<th>Año</th>");
    $tr.append("<th>Mes</th>");
    $tr.append("<th>Fecha de pago</th>");
    $tr.append("<th>Valor</th>");
    $tr.append("<th>Estado</th>");
   
    $tr.append("<th>Evidencia</th>");
    


    $cabecera2.append($tr);

    var indice = 1

    $.get("http://localhost:3000/pagoAlicuota?parametro=" +idresidente, function (respuesta) {


        $("#pantalla2").empty();
        var $pantalla2 = $("#pantalla2");

        for (let i = 0; i < respuesta.data.length; i++) {

            var $tr = $("<tr></tr>");
            $tr.append("<td>" + indice + "</td>");
            $tr.append("<td>" + respuesta.data[i].anio + "</td>");
            $tr.append("<td>" + respuesta.data[i].mes + "</td>");
            $tr.append("<td>" + respuesta.data[i].fechapago + "</td>");
            $tr.append("<td>" + respuesta.data[i].valor + "</td>");
            $tr.append("<td>" + respuesta.data[i].estado + "</td>");
           


            $tr.append("<td><button value='" + respuesta.data[i].idresidente + "' class='btn btn-light' data-toggle='modal' data-target='#fm-modal'> <img src='../img/nube.PNG' style='width: 30px; height: 30px;'></img> </button></td>");
            

            $pantalla2.append($tr);

            indice += 1
        }

    });
}



function Salir() {
    window.open("http://localhost:3000/html/menuAdministrador.html"); //
    window.close("http://localhost:3000/html/residente.html");
}
