
function validarLogin(){

    var user = document.getElementById("nick_Usuario").value;
    var password = document.getElementById("claveUsuario").value;

    if (user == "Johnny" && password == "12345" ){

        alert("Bienvenido Administrador "+user);

        window.close("http://localhost:3000/html/login.html");
        window.open("http://localhost:3000/html/menuAdministrador.html");
         
    }else {
        alert("Bienvenido Residente "+user);

        window.close("http://localhost:3000/html/login.html");
        window.open("http://localhost:3000/html/menuResidente.html");
    }
}

function soloNumLetras(e) {
   key = e.keyCode
   console.log("key", key) 
   if (key != 46 && key != 39) { //46 es . y 39 es '
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " abcdefghijklmnñopqrstuvwxyz0123456789";
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

function soloClave(e) {
   key = e.keyCode
   console.log("key", key) 
   if (key != 46 && key != 39) { //46 es . y 39 es '
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijklmnñopqrstuvwxyz0123456789";
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

function rangoClave() {
   var val = document.getElementById("claveUsuario").value;
   var tam = val.length;
   if (tam >= 1 && tam <= 4) {
       alert("Error ingrese mas de 4 caracteres")
       document.getElementById("claveUsuario").value = '';
       document.getElementById("claveUsuario").focus();
   }
}

espacios = function (input) {
   if (event.keyCode == 32) {
       input.value = input.value.replace('  ', ' '); //sustituimos dos espacios seguidos por uno 
   }
}

/*
function close_tab() {
   if (confirm("¿Quieres salir?")) {
     window.close();
   }
 }
 */