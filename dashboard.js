/* FECHA */

const fecha =
new Date();

document
.getElementById("fechaActual")
.textContent =
fecha.toLocaleDateString("es-MX");

/* VARIABLES */

let ingresos = [];

let gastos = [];

let movimientos = [];

let metas = [];

/* ELEMENTOS */

const tabla =
document.getElementById("tablaMovimientos");

const tablaCompleta =
document.getElementById("tablaCompleta");

const saldoHTML =
document.getElementById("saldo");

const ingresosHTML =
document.getElementById("ingresos");

const gastosHTML =
document.getElementById("gastos");

const contenedorMetas =
document.getElementById("contenedorMetas");

/* INGRESOS */

document
.getElementById("formIngreso")
.addEventListener("submit", function(e){

    e.preventDefault();

    let concepto =
    document.getElementById("conceptoIngreso").value;

    let monto =
    parseFloat(
        document.getElementById("montoIngreso").value
    );

    if(!concepto || isNaN(monto)){

        alert("Completa los campos");

        return;

    }

    ingresos.push({
        concepto,
        monto
    });

    agregarMovimiento(
        concepto,
        monto,
        "Ingreso"
    );

    actualizarResumen();

    this.reset();

});

/* GASTOS */

document
.getElementById("formGasto")
.addEventListener("submit", function(e){

    e.preventDefault();

    let concepto =
    document.getElementById("conceptoGasto").value;

    let monto =
    parseFloat(
        document.getElementById("montoGasto").value
    );

    if(!concepto || isNaN(monto)){

        alert("Completa los campos");

        return;

    }

    gastos.push({
        concepto,
        monto
    });

    agregarMovimiento(
        concepto,
        monto,
        "Gasto"
    );

    actualizarResumen();

    this.reset();

});

/* MOVIMIENTOS */

function agregarMovimiento(
    concepto,
    monto,
    tipo
){

    const fecha =
    new Date()
    .toISOString()
    .split("T")[0];

    movimientos.push({

        fecha,
        concepto,
        monto,
        tipo

    });

    renderizarMovimientos();

    const fila =
    document.createElement("tr");

    fila.innerHTML = `

        <td>${concepto}</td>

        <td>$${monto.toFixed(2)}</td>

        <td>

            <span class="
                badge
                ${tipo === "Ingreso"
                    ? "bg-success"
                    : "bg-danger"}
            ">

                ${tipo}

            </span>

        </td>

    `;

    tabla.prepend(fila);

}

/* TABLA COMPLETA */

function renderizarMovimientos(){

    tablaCompleta.innerHTML = "";

    let filtro =
    document.getElementById("filtroFecha").value;

    let movimientosFiltrados =
    movimientos;

    if(filtro){

        movimientosFiltrados =
        movimientos.filter(
            mov => mov.fecha === filtro
        );

    }

    movimientosFiltrados.forEach(mov => {

        tablaCompleta.innerHTML += `

            <tr>

                <td>${mov.fecha}</td>

                <td>${mov.concepto}</td>

                <td>

                    $${mov.monto.toFixed(2)}

                </td>

                <td>

                    <span class="
                        badge
                        ${mov.tipo === "Ingreso"
                            ? "bg-success"
                            : "bg-danger"}
                    ">

                        ${mov.tipo}

                    </span>

                </td>

            </tr>

        `;

    });

}

document
.getElementById("filtroFecha")
.addEventListener(
    "change",
    renderizarMovimientos
);

/* RESUMEN */

function actualizarResumen(){

    let totalIngresos =
    ingresos.reduce(
        (acc,item)=> acc + item.monto,
        0
    );

    let totalGastos =
    gastos.reduce(
        (acc,item)=> acc + item.monto,
        0
    );

    ingresosHTML.textContent =
    "$" + totalIngresos.toFixed(2);

    gastosHTML.textContent =
    "$" + totalGastos.toFixed(2);

    saldoHTML.textContent =
    "$" +
    (
        totalIngresos -
        totalGastos
    ).toFixed(2);

}

/* METAS */

document
.getElementById("formMeta")
.addEventListener("submit", function(e){

    e.preventDefault();

    const nombre =
    document.getElementById("nombreMeta").value;

    const monto =
    parseFloat(
        document.getElementById("montoMeta").value
    );

    if(!nombre || isNaN(monto)){

        alert("Completa los campos");

        return;

    }

    metas.push({

        nombre,
        monto

    });

    renderizarMetas();

    this.reset();

});

/* RENDER */

function renderizarMetas(){

    contenedorMetas.innerHTML = "";

    metas.forEach((meta,index)=>{

        contenedorMetas.innerHTML += `

            <div class="col-lg-4">

                <div class="meta-card">

                    <h5>

                        ${meta.nombre}

                    </h5>

                    <p>

                        Objetivo:
                        $${meta.monto.toFixed(2)}

                    </p>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarMeta(${index})">

                        Eliminar

                    </button>

                </div>

            </div>

        `;

    });

}

/* ELIMINAR */

function eliminarMeta(index){

    metas.splice(index,1);

    renderizarMetas();

}

/* SECCIONES */

const inicioSection =
document.getElementById("inicio-section");

const movimientosSection =
document.getElementById("movimientos-section");

const metasSection =
document.getElementById("metas-section");

const configSection =
document.getElementById("config-section");

/* BOTONES */

document
.getElementById("btnInicio")
.addEventListener("click", function(e){

    e.preventDefault();

    mostrarSeccion("inicio");

});

document
.getElementById("btnMovimientos")
.addEventListener("click", function(e){

    e.preventDefault();

    mostrarSeccion("movimientos");

});

document
.getElementById("btnMetas")
.addEventListener("click", function(e){

    e.preventDefault();

    mostrarSeccion("metas");

});

document
.getElementById("btnConfig")
.addEventListener("click", function(e){

    e.preventDefault();

    mostrarSeccion("config");

});

/* MOSTRAR */

function mostrarSeccion(seccion){

    inicioSection.classList.add("d-none");

    movimientosSection.classList.add("d-none");

    metasSection.classList.add("d-none");

    configSection.classList.add("d-none");

    document
    .querySelectorAll(".menu-link")
    .forEach(link => {

        link.classList.remove("active");

    });

    if(seccion === "inicio"){

        inicioSection.classList.remove("d-none");

        document
        .getElementById("btnInicio")
        .classList.add("active");

    }

    if(seccion === "movimientos"){

        movimientosSection.classList.remove("d-none");

        document
        .getElementById("btnMovimientos")
        .classList.add("active");

    }

    if(seccion === "metas"){

        metasSection.classList.remove("d-none");

        document
        .getElementById("btnMetas")
        .classList.add("active");

    }

    if(seccion === "config"){

        configSection.classList.remove("d-none");

        document
        .getElementById("btnConfig")
        .classList.add("active");

    }

}

/* CERRAR SESIÓN */

document
.getElementById("cerrarSesion")
.addEventListener("click", function(){

    window.location.href =
    "login.html";

});