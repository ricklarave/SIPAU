
//CERRAR SESION
function cierreLogin() {
   alert("Cierre sesion");
   
   window.open("http://localhost:3000/html/login.html");
   window.close("http://localhost:3000/html/menuAdministrador.html");

   
}

//Botones de Administrador
function gestionarResidente() {
     
   window.open("http://localhost:3000/html/residente.html");
   window.close("http://localhost:3000/html/menuAdministrador.html");
}

function gestionarUsuario() {
   
   window.open("http://localhost:3000/html/usuario.html");
   window.close("http://localhost:3000/html/menuAdministrador.html");
}

function gestionarAdministrador() {
   
   window.open("http://localhost:3000/html/administrador.html");
   window.close("http://localhost:3000/html/menuAdministrador.html");
}

function verificarPagos() {
     

}

