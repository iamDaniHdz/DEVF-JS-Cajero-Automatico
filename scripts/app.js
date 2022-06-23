const formBusqueda = document.querySelector('#form-busqueda');
const inputName = document.querySelector('#usuario');
const inputPassword = document.querySelector('#nip');
const btnLogin = document.querySelector('#btnLogin');

const textName1 = document.querySelector('#userName1')

const textWelcome = document.querySelector('#textoWelcome')

let userLogin = {
    user: '',
    saldo: ''
}

let datosBusqueda = {
    nip: '',
}

// Función que guarda el usuario seleccionado en otra entrada en el localStorage: "userLogin"
function guardar_user_localStorage() {
    localStorage.setItem("cuentaLogin", JSON.stringify(userLogin));
}

function userLogin1() {
    userLogin.user = cuentas[0]['nombre']
    userLogin.saldo = cuentas[0]['saldo']
    window.location = "login.html"
    guardar_user_localStorage();
}

function userLogin2() {
    userLogin.user = cuentas[1]['nombre']
    userLogin.saldo = cuentas[1]['saldo']
    window.location = "login.html"
    guardar_user_localStorage()
}

function userLogin3() {
    userLogin.user = cuentas[2]['nombre']
    userLogin.saldo = cuentas[2]['saldo']
    window.location = "login.html"
    guardar_user_localStorage()
}

obtener_user_localstorage()

// Función para obtener solo el nombre de usuario y su saldo correspondiente según lo guardado en el localStorage
function obtener_user_localstorage() {
    cuentaLogin = JSON.parse(localStorage.getItem("cuentaLogin"));
}

if (userPhoto != undefined) {
    cambiarUserPhoto();
    saludo();
}

// Saludo de bienvenida segun el usuario actual
function saludo() {
    let user = cuentaLogin.user;
    textWelcome.innerHTML = "Hola de nuevo " + user.toUpperCase();
}

// Cambiar foto de perfil según el usuario actual
function cambiarUserPhoto() {
    document.getElementById("userPhoto").src = `assets/${cuentaLogin.user}.png`;
}

// Función que valida los datos para poder iniciar sesión
function validacion() {
    if (cuentaLogin.user == cuentas[0]['nombre'] && datosBusqueda.nip == cuentas[0]['nip']) {
        login();
    } else if (cuentaLogin.user == cuentas[1]['nombre'] && datosBusqueda.nip == cuentas[1]['nip']) {
        login()
    } else if (cuentaLogin.user == cuentas[2]['nombre'] && datosBusqueda.nip == cuentas[2]['nip']) {
        login()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta!',
        })
    }
}

// Función submit del botón Iniciar Sesión
formBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();

    datosBusqueda.nip = inputPassword.value;
    validacion();
});

// Función que redirecciona al Dashboard
function login() {
    window.location = "transaction.html"
}