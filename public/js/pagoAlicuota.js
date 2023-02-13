listarPago();

function listarPago(idResidente) {

    $("#cabecera").empty();
    var $cabecera = $("#cabecera");

    var $tr = $("<tr></tr>");
    $tr.append("<th>No</th>");
    $tr.append("<th>Año</th>");
    $tr.append("<th>Mes</th>");
    $tr.append("<th>Fecha de pago</th>");
    $tr.append("<th>Valor</th>");
    $tr.append("<th>Estado</th>");
   
    $tr.append("<th>Evidencia</th>");
    


    $cabecera.append($tr);

    var indice = 1


    $.get("/pagoAlicuota?parametro=" + idResidente, function (respuesta) {


        $("#pantalla").empty();
        var $pantalla = $("#pantalla");

        for (let i = 0; i < respuesta.data.length; i++) {

            var $tr = $("<tr></tr>");
            $tr.append("<td>" + indice + "</td>");
            $tr.append("<td>" + respuesta.data[i].anio + "</td>");
            $tr.append("<td>" + respuesta.data[i].mes + "</td>");
            $tr.append("<td>" + respuesta.data[i].fechapago + "</td>");
            $tr.append("<td>" + respuesta.data[i].valor + "</td>");
            $tr.append("<td>" + respuesta.data[i].estado + "</td>");
           


            $tr.append("<td><button value='" + respuesta.data[i].idresidente + "' onclick='modificarResidente(this)' class='btn btn-light modificar' data-toggle='modal' data-target='#fm-modal'> <img src='../img/nube.PNG' style='width: 30px; height: 30px;'></img> </button></td>");
            

            $pantalla.append($tr);

            indice += 1
        }

    });

}


function Salir() {
        
    window.open("http://localhost:3000/html/menuResidente.html"); //
    window.close("http://localhost:3000/html/pagoAlicuota.html");
     
 }