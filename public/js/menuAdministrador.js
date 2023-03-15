
//CERRAR SESION
function cierreLogin() {
   alert("Cierre de sesion");
   
   window.open("http://localhost:3000/html/login.html");
   window.close("http://localhost:3000/html/menuAdministrador.html");
}

//Botones de Administrador

function obtenerId(){
   var idusuario = localStorage.getItem("idusuario");
   console.log("idusuario "+idusuario)
}

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

   window.open("http://localhost:3000/html/verificarPagos.html");  
   window.close("http://localhost:3000/html/menuAdministrador.html");
}

function mostrarEsquema() {

   window.open("http://localhost:3000/html/Residentes.html");  
   window.close("http://localhost:3000/html/menuAdministrador.html");
}
