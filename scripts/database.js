// Arreglo de objetos
const cuentasUsers  = [
    {
        nombre: 'mali',
        saldo: 200,
        nip: 1111,
    },
    {
        nombre: 'gera',
        saldo: 290,
        nip: 2222,
    },
    {
        nombre: 'maui',
        saldo: 67,
        nip: 3333,
    },
]

// Variable en la que se guardará lo obtenido del localStorage
let cuentas;

guardar_localstorage();

obtener_localstorage();

// Función que guarda el arreglo "cuentasUsers" en localStorage 
function guardar_localstorage() {
    // Condicion: guardar arreglo, solo si no se ha guardado antes
    if(!localStorage.getItem("cuentas")){
        localStorage.setItem("cuentas", JSON.stringify(cuentasUsers));
    }
}

// Función para obtener lo guardado en el localStorage
function obtener_localstorage() {
    if (localStorage.getItem("cuentas")) {
        cuentas = JSON.parse(localStorage.getItem("cuentas"));
        console.log("Hay entradas en el local storage");
    } else {
        console.log("No hay entradas en el local storage");
    }
}