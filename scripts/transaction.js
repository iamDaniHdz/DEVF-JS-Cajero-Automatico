const textSaludo = document.querySelector('#textoSaludo')
const dateTime = document.querySelector('#date')
const optionSelected = document.querySelector('#optionSelected')
const textoBefore = document.querySelector('#textoBefore')
const amountBefore = document.querySelector('#amountBefore')
const textoAfter = document.querySelector('#textoAfter')
const amountAfter = document.querySelector('#amountAfter')

let saldoUser;
let saldoNuevo;

// Función que obtiene la fecha y hora actual
function getDate() {
    const fecha = new Date();
    let hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    return fecha.toDateString() + " | " + hora;
}

saludoUser()

// Función de bienvenida al Dashboard del usuario personalizado
function saludoUser() {
    cuentaLogin = JSON.parse(localStorage.getItem("cuentaLogin"));
    user = cuentaLogin.user;
    textSaludo.innerHTML = "Dasboard de: " + user.toUpperCase();
}

// Función que guarda el nombre del usuario en uso
function userName(name) {
    return name.nombre === cuentaLogin.user;
}

// Función que consulta los datos consultados del usuario en uso
function consultarSaldo() {
    dataUser = cuentas.find(userName);
    dateTime.textContent = getDate()
    optionSelected.textContent = "Consultar Saldo"
    textoBefore.textContent = "Saldo Disponible: "
    amountBefore.textContent = `$${dataUser.saldo}`
    textoAfter.textContent = ""
    amountAfter.textContent = ""
}

// Función para ingresar monto
function ingresarMonto() {

    addMonto = 0;

    // Sweet Alert - Ingrese una cantidad
    Swal
        .fire({
            title: "Ingrese una cantidad",
            input: "number",
            inputAttributes: {
                min: 0,
                max: 1000
            },
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'Tiene que ingresar una cantidad'
                } else if (value <= 0) {
                    return 'Ingrese un número mayor a 0'
                }
            }
        })
        .then(resultado => {
            if (resultado.value) {
                addMonto = parseInt(resultado.value);

                dataUser = cuentas.find(userName);
                saldoUser = dataUser.saldo;

                // Condición: Realizar si el monto no es mayor a $990
                if (dataUser.saldo + addMonto < 990) {

                    saldoNuevo = saldoUser + addMonto;

                    // Sweet Alert - Ingreso exitoso
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Ingreso exitoso',
                        text: `Ingresaste $${addMonto}`,
                        showConfirmButton: false,
                        timer: 1500
                    })

                } else {
                    // Condición: Monto no puede ser mayor a $990
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'No puede tener mas de $990 en su cuenta',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    saldoNuevo = saldoUser
                }

                dataUser.saldo = saldoNuevo;
                localStorage.setItem("cuentas", JSON.stringify(cuentas));

                dateTime.textContent = getDate()

                optionSelected.textContent = "Ingresar Monto"

                textoBefore.textContent = "Saldo Anterior: "
                amountBefore.textContent = `$${saldoUser}`

                textoAfter.textContent = "Saldo Actual: "
                amountAfter.textContent = `$${saldoNuevo}`

            } else {
                transactionCanceled()
            }
        });
}

// Función para retirar monto
function retirarMonto() {

    removeMonto = 0;

    // Sweet Alert - Ingrese una cantidad
    Swal
        .fire({
            title: "Ingrese una cantidad",
            input: "number",
            inputAttributes: {
                min: 0,
                max: 1000
            },
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'Tiene que ingresar una cantidad'
                } else if (value <= 0) {
                    return 'Ingrese un número mayor a 0'
                }
            }
        })
        .then(resultado => {
            if (resultado.value) {
                removeMonto = parseInt(resultado.value);

                dataUser = cuentas.find(userName);
                saldoUser = dataUser.saldo;

                // Condición: Realizar si el monto no es menor a $10
                if (dataUser.saldo - removeMonto > 10) {
                    saldoNuevo = saldoUser - removeMonto;

                    // Sweet Alert - Retiro exitoso
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Retiro exitoso',
                        text: `Retiraste $${removeMonto}`,

                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    // Condición: Monto no puede ser menor a $10
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'No puede tener menos de $10 en su cuenta',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    saldoNuevo = saldoUser
                }

                dataUser.saldo = saldoNuevo;
                localStorage.setItem("cuentas", JSON.stringify(cuentas));

                dateTime.textContent = getDate()

                optionSelected.textContent = "Retirar Monto"

                textoBefore.textContent = "Saldo Anterior: "
                amountBefore.textContent = `$${saldoUser}`

                textoAfter.textContent = "Saldo Actual: "
                amountAfter.textContent = `$${saldoNuevo}`

            } else {
                transactionCanceled()
            }
        });
}

// Sweet Alert - Transacción cancelada
function transactionCanceled() {
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Transacción cancelada',
        showConfirmButton: false,
        timer: 1500
    })
}

// Función para cerrar sesión
function salir() {
    // Sweet Alert - ¿Quieres cerrar tu sesión?
    Swal.fire({
        icon: 'warning',
        title: '¿Quieres cerrar tu sesión?',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        confirmButtonColor: '#d33',
    })
    .then((result) => {
        if (result.isConfirmed) {
            window.location = "index.html"
        }
    })
}
