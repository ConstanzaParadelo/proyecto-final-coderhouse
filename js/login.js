//Ejecutando funciones
document.getElementById("datosSesion").addEventListener("click", validarDatos);
document.getElementById("btnRegistro").addEventListener("click", validarRegistro);


//Declarando variables de Registro nuevo usuario
const nombre = document.getElementById("nombreRegister");
const apellido = document.getElementById("apellidoRegister");
const email = document.getElementById("mailRegister");
const usuarioRegister = document.getElementById("usuarioRegister");
const pass = document.getElementById("passRegister");
const parrafo = document.getElementById("warnings");
const parrafoLogin = document.getElementById("warningsLogin");
//Declarando variable para validar datos registro con login
let usuarios = [];

//Declarando objetos del Localstorage

class Usuario {

  constructor(nombre, apellido, email, usuarioRegister, pass) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.usuarioRegister = usuarioRegister;
    this.pass = pass;
  }
}

//FUNCIONES

function validarDatos() {
  let warnings = "";
  const usuario = document.getElementById("usuario"); 
  const contraseña = document.getElementById("password");
  parrafoLogin.innerHTML = "";

  let loginJson = JSON.parse(localStorage.getItem("usuarios"));
  console.log(loginJson);
  const result = loginJson.find((u) => u.usuarioRegister === usuario.value); 
  console.log(result);

  if (result && result.pass === contraseña.value) {
    location.href = "./turneroProfesional.html";
  } else {
    warnings += `El usuario o contraseña es incorrecta <br>`;
    parrafoLogin.innerHTML = warnings;
  }
}

 function validarRegistro() {
  let warnings = "";
  let entrar = false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  parrafo.innerHTML = "";
  if (nombre.value.length < 6) {
    warnings += `El nombre no es valido <br>`;
    entrar = true;
  }

  if (apellido.value.length < 0) {
    warnings += `El apellido no es valido <br>`;
    entrar = true;
  }
  if (!regexEmail.test(email.value)) {
    warnings += `El email no es valido <br>`;
    entrar = true;
  }
  if (usuarioRegister.value.length < 5) {
    warnings += `El usuario no es valido <br>`;
    entrar = true;
  }
  if (pass.value.length < 6) {
    warnings += `La contraseña no es valida <br>`;
    entrar = true;
  }

  if (entrar) {
    parrafo.innerHTML = warnings;
  } else {


    usuarios.push(
      new Usuario(
        nombre.value,
        apellido.value,
        email.value,
        usuarioRegister.value,
        pass.value
      )
    );
    let usuarioJson = JSON.stringify(usuarios);
    console.log(usuarios);
    localStorage.setItem("usuarios", usuarioJson);
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Registrado exitosamente'
  })
}
