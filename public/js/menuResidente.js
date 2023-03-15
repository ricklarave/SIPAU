
//CERRAR SESION
function cierreLogin() {
   alert("Cierre de sesion");
   
   window.open("http://localhost:3000/html/login.html");
   window.close("http://localhost:3000/html/menuResidente.html");
}


//Boton de residente
function listarPagos() {
     
   window.open("http://localhost:3000/html/pagoAlicuota.html");
   window.close("http://localhost:3000/html/menuResidente.html");
}

