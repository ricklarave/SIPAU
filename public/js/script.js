function listarResidentes () {
    $.get("http://localhost:3000/residente", function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });

}

function insertarResidente(){
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

    console.log(data)

    $.post("http://localhost:3000/residente",data, function( data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
}



