
obtenerMesAlquiler(2);



//2. Metodo para generar pago, valor a pagar inicia en 90
//3. Metodo para actualizar pago, valor a pagar incrementa segun la mora a 100 o 110
//4. Metodo para actualizar pago cuando el residente sube el comprobante. 
  

function obtenerMesAlquiler(idresidente) {
    $.get("/residente?parametro=" + idresidente, function (respuesta) {

        
        if (respuesta.data.length == 0) {
            alert("No es residente")
        } else {
            for (let i = 0; i < respuesta.data.length; i++) {

                document.getElementById("nombreResidente").value = respuesta.data[i].nombresresidente + ' ' + respuesta.data[i].apellidosresidente
                document.getElementById("fechaInicio").value = respuesta.data[i].fechaalquiler.substring(0, 10);

                let mesIniciaAlquilar = parseInt(respuesta.data[i].fechaalquiler.substring(7, 5));
                let anioIniciaAlquilar = parseInt(respuesta.data[i].fechaalquiler.substring(0, 4));

                //se asigna a mesFechaAlquila el mes en que inicio el alquiler
                console.log('Inicio a alquilar en el mes: ' + mesIniciaAlquilar + ' Anio: ' + anioIniciaAlquilar)

                generarPago(anioIniciaAlquilar, mesIniciaAlquilar, idresidente)
                var data =
                {

                    "idpago": idpago,
                    "idresidente": idresidente,
                    "anio": anio,
                    "mes": mes,
                    "fechapago": fechapago,
                    "valor": valor,
                    "estado": estado,
                    "verificar": verificar,
                    "numerotramite": numerotramite,
                    "banco": banco,
                    "comprobante": comprobante

                }





            }
        }
    });
}



function generarPago(anioP, mesP, idresidenteP) {

    //2. Metodo para generar pago( hacer INSERT en BD), valor a pagar inicia en 90

    // Obtener id del residente que ingresa
    // Comprobar que no se haya generado pago para este mes
    // mes actual, meses registrados
    // Tomar el ultimo mes y si falta el actual, hacer el INSERT
    //  La fecha da problemas al momento de pasar al js, habra que formatear
    //Si existe : actualizamos la fecha de pago segun los dias de mora
    //No existe : generamos la fecha de pago 
    // Si fechaPago < finMes = valor * 0.90
    // Si fechaPago 

    var hoy = new Date();

    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    var ultimoDiaMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    var diasMes = new Date(anioP, mesP, 0).getDate();

    console.log('El mes ' + mm + ' tiene ' + ultimoDiaMes + ' dias del anio ' + yyyy)
    console.log('El mes ' + mesP + ' tiene ' + diasMes + ' dias del anio ' + anioP)

    $.get("http://localhost:3000/pagoAlicuota?parametro=" + idresidenteP, function (respuesta) {

        //El residente no tiene pagos registrados
        //Se genera su primer pago desde el mes que empieza a alquilar: Empezo a alquilar este mes o meses anteriores
        //Empezo a alquilar este mes: El primer pago se genera el MES_EMPEZO_ALQUILAR
        //Empezo a alquilar hace ya algunos meses: El primer pago se genera desde MES_EMPEZO_ALQUILAR hasta este MM

        //El residente tiene pagos registrados
        //Se genera su siguiente pago solo si ULTIMO_MES_PAGO_BD no es igual a MM y YYYY


        //Si ya existe el registro solo ACTUALIZAR
        //Si no existe el registro GENERAR PAGO
        //Generar pagos desde el mes de alquiler


        for (let i = 0; i < respuesta.data.length; i++) {

            var ultimoMesPagoBD = respuesta.data[i].mes
            var ultimoAnioPagoBD = respuesta.data[i].anio

            console.log(ultimoMesPagoBD + 'Entra')

            if (respuesta.data[i].mes <= mm || respuesta.data[i].anio <= yyyy) {
                console.log(respuesta.data[i])
                console.log(ultimoMesPagoBD + ' es el ultimo mes de pago registrado anio ' + ultimoAnioPagoBD)




            }


        }


        if (respuesta.data.length > 0) {

            for (let i = mesP + 1; i <= mm; i++) {


                if (ultimoMesPagoBD != mm) {

                    diasMes = new Date(ultimoAnioPagoBD, i, 0).getDate();

                    let idresidente = idresidenteP
                    let anio = yyyy
                    let mes = i
                    let fechapago = diasMes + '/' + mes + '/' + anio
                    let valor = 90.00
                    let estado = 'PENDIENTE'

                    var data = {

                        "idresidente": idresidente,
                        "anio": anio,
                        "mes": mes,
                        "fechapago": fechapago,
                        "valor": valor,
                        "estado": estado

                    }

                    console.log(data)
                    $.ajax({
                        url: "/pagoAlicuota",
                        type: "POST",
                        data: data,
                        success: function (result, status) {
                            if (status == "success") {
                                alert("Tiene nuevos valores pendientes");
                            } else {
                                alert("Error al generar el pago")
                            }
                        },
                    });

                } else {

                }

            }
        } else if (respuesta.data.length == 0) {

            for (let i = mesP; i <= mm; i++) {
                console.log('Hola')

                if (ultimoMesPagoBD != mm) {
                    console.log('Genra pago')


                    diasMes = new Date(yyyy, i, 0).getDate();

                    let idresidente = idresidenteP
                    let anio = yyyy
                    let mes = i
                    let fechapago = diasMes + '/' + mes + '/' + anio
                    let valor = 90.00
                    let estado = 'PENDIENTE'

                    var data = {

                        "idresidente": idresidente,
                        "anio": anio,
                        "mes": mes,
                        "fechapago": fechapago,
                        "valor": valor,
                        "estado": estado

                    }

                    console.log(data)
                    $.ajax({
                        url: "/pagoAlicuota",
                        type: "POST",
                        data: data,
                        success: function (result, status) {
                            if (status == "success") {
                                alert("Tiene nuevos valores pendientes");
                            } else {
                                alert("Error al generar el pago")
                            }
                        },
                    });

                } else {

                }

            }

        }

        listarPago(idresidenteP)

    });


}

function actualizarPagos() {

    let hoy = new Date();

    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1;
    let yyyy = hoy.getFullYear();

    let ultimoDiaMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    let diasMes = new Date(anioP, mesP, 0).getDate();

    //actualizar fechas de pago y su valor
    //actualizar segun los datos que se carguen



    // let idpago=
    // let idresidente=
    // let anio=
    // let mes=
    // let fechapago
    // let valor
    // let estado
    // let verificar
    // let numerotramite
    // let banco
    // let comprobante

    var data =
    {

        "idpago": idpago,
        "idresidente": idresidente,
        "anio": anio,
        "mes": mes,
        "fechapago": fechapago,
        "valor": valor,
        "estado": estado,
        "verificar": verificar,
        "numerotramite": numerotramite,
        "banco": banco,
        "comprobante": comprobante

    }

    $.ajax({
        url: "/pagoAlicuota",
        type: "PUT",
        data: data,
        success: function (result, status) {
            if (status == "success") {
                alert("Pago Actualizado");
            } else {
                alert("Error al actualizar el pago")
            }
        },
    });
}


function listarPago(idresidente) {

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

    $.get("http://localhost:3000/pagoAlicuota?parametro=" + idresidente, function (respuesta) {

        $("#pantalla").empty();
        var $pantalla = $("#pantalla");

        for (let i = 0; i < respuesta.data.length; i++) {

            var $tr = $("<tr></tr>");
            $tr.append("<td>" + indice + "</td>");
            $tr.append("<td>" + respuesta.data[i].anio + "</td>");
            $tr.append("<td>" + respuesta.data[i].mes + "</td>");
            $tr.append("<td>" + respuesta.data[i].fechapago.substring(0, 10) + "</td>");
            $tr.append("<td>" + respuesta.data[i].valor + "</td>");
            $tr.append("<td>" + respuesta.data[i].estado + "</td>");

            $tr.append("<td><button value='" + respuesta.data[i].idresidente + "' class='btn btn-light' data-toggle='modal' data-target='#fm-modal'> <img src='../img/nube.PNG' style='width: 30px; height: 30px;'></img> </button></td>");


            $pantalla.append($tr);

            indice += 1
        }

    });


}



function cargarComprobante(idresidente) {
    //hacer un update en la tabla pagoAlicuotas
}


function Salir() {

    window.open("http://localhost:3000/html/menuResidente.html"); //
    window.close("http://localhost:3000/html/pagoAlicuota.html");

}