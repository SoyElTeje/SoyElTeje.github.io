window.addEventListener("load", inicio);

//Autor: Lucas Tejería (307630)

/* LISTADO FUNCIONES

Reclamos
--------

    1) Botón Agregar reclamo (118)
    2) Actualizar reclamos mostrados (167) --> listener botón me pasó (214)
    3) Buscador (348)

Empresas
--------

    1) Botón agregar empresa (141)
    2) Agregar empresa a combo (160) 

Estadísticas
------------

    1) Actualizar estadísticas (234) --> Llama a actualizarListaEmpresasSinReclamo(), actualizarRubroMaximo(), crearBotonesLetras() y crearTabla()
    2) Crear tabla (243)
    3) Crear botones letra (296)
    4) Boton de filtro letras tocado (319)
    5) Actualizar empresas sin reclamo (365)
    6) Actualizar rubro máximo (385)

*/
let sistema = new Sistema();
let cantidadReclamos = 1;
let introduccion;
let agregarReclamo;
let reclamosIngresados;
let estadisticas;
let agregarEmpresa;
let radioButton1;
let radioButton2;

function inicio (){

    //SECCIONES DE LA PAGINA
    introduccion = document.getElementById("introduccion");
    agregarReclamo = document.getElementById("agregar-reclamo");
    reclamosIngresados = document.getElementById("reclamos-ingresados");
    estadisticas = document.getElementById("estadisticas");
    agregarEmpresa = document.getElementById("agregar-empresa");
    
    //MOSTRAMOS SOLO LA INTRODUCCION
    agregarReclamo.style.display = 'none';
    reclamosIngresados.style.display = 'none';
    estadisticas.style.display = 'none';
    agregarEmpresa.style.display = 'none';

    //DEFINIMOS LOS RADIO BUTTONS
    radioButton1 = document.getElementById('radio1');
    radioButton2 = document.getElementById('radio2');

    //DEFINIMOS LOS CLICKS
    document.getElementById("agregar-reclamo__boton").addEventListener("click", botonAgregarReclamo);
    document.getElementById("agregar-empresa__boton").addEventListener("click", botonAgregarEmpresa);
    document.getElementById("aIntroduccion").addEventListener("click", mostrarIntro);
    document.getElementById("aReclamosIngresados").addEventListener("click", mostrarReclamosIngresados);
    document.getElementById("aEstadisticas").addEventListener("click", mostrarEstadisticas);
    document.getElementById("aAgregarEmpresa").addEventListener("click", mostrarAgregarEmpresa);
    document.getElementById("introduccion__reclamo").addEventListener("click", mostrarAgregarReclamo);
    document.getElementById('lupa-busqueda').addEventListener('click', lupaBuscar)
    radioButton1.addEventListener('click', actualizarTodo);
    radioButton2.addEventListener('click', actualizarTodo);
}

function actualizarTodo() {
    actualizarEstadisticas(sistema.getUltimaLetra());
}

function mostrarIntro() {
    introduccion.style.display = 'block'
    agregarReclamo.style.display = 'none';
    reclamosIngresados.style.display = 'none';
    estadisticas.style.display = 'none';
    agregarEmpresa.style.display = 'none';
}

function mostrarReclamosIngresados() {
    introduccion.style.display = 'none'
    agregarReclamo.style.display = 'none';
    reclamosIngresados.style.display = 'block';
    estadisticas.style.display = 'none';
    agregarEmpresa.style.display = 'none';
}

function mostrarEstadisticas() {
    introduccion.style.display = 'none'
    agregarReclamo.style.display = 'none';
    reclamosIngresados.style.display = 'none';
    estadisticas.style.display = 'block';
    agregarEmpresa.style.display = 'none';
}

function mostrarAgregarEmpresa() {
    introduccion.style.display = 'none'
    agregarReclamo.style.display = 'none';
    reclamosIngresados.style.display = 'none';
    estadisticas.style.display = 'none';
    agregarEmpresa.style.display = 'block';
}

function mostrarAgregarReclamo () {
    if (sistema.empresas.length > 0) {
        introduccion.style.display = 'none'
        agregarReclamo.style.display = 'block';
    } else {
        alert('Debe agregar empresas antes de agregar reclamos.')
    }
}


function botonAgregarReclamo() {
    if (document.getElementById("agregar-reclamo__todo").reportValidity()) {
        let nombre = document.getElementById("Nombre").value;
        let nombreEmpresaReclamada = document.getElementById("empresa").value;
        let tituloReclamo = document.getElementById("titulo-reclamo").value;
        let textoReclamo = document.getElementById("contenido-reclamo").value;
        let empresaReclamada = sistema.buscarEmpresaNombre(nombreEmpresaReclamada);
        let nuevoReclamo = new Reclamo(nombre, empresaReclamada, tituloReclamo, textoReclamo, cantidadReclamos);
        if (sistema.yaExisteEmpresa(empresaReclamada.nombreEmpresa)) {
            sistema.agregarReclamo(nuevoReclamo, empresaReclamada);
            empresaReclamada.sumarReclamo();
            console.log("Reclamo agregado");
            actualizarReclamosMostrados((sistema.darReclamos('')));
        }
        else {
            alert("Agregue una empresa antes de agregar un reclamo.")
        }
        document.getElementById("agregar-reclamo__todo").reset();
        actualizarEstadisticas(sistema.getUltimaLetra());
    }
    
}

function botonAgregarEmpresa() {
    if (document.getElementById("agregar-empresa__todo").reportValidity()) {
        let nombre = document.getElementById("nombre-empresa").value;
        let direccion = document.getElementById("direccion-empresa").value;
        let rubro = document.getElementById("rubro-nueva-empresa").value;
        if (!sistema.yaExisteEmpresa(nombre)) {
            let nuevaEmpresa = new Empresa(nombre, direccion, rubro);
            sistema.agregarEmpresa(nuevaEmpresa);
            agregarEmpresaCombo(nombre);
            console.log("Empresa agregada");
        }
        else {
            alert('Esta emprese ya fue agregada, no se guardaran los cambios.')
        }
        document.getElementById("agregar-empresa__todo").reset();
        actualizarEstadisticas(sistema.getUltimaLetra());
    }
}

function agregarEmpresaCombo(nombre) {
    let combo = document.getElementById("empresa");
    let opt = document.createElement("option");
    opt.innerText = nombre;
    combo.appendChild(opt)
}

function actualizarReclamosMostrados(arrayReclamos) {
    let articulo = document.getElementById('reclamos-ingresados');
    articulo.innerHTML = "";
    let h3Titulo = document.createElement('h3');
    h3Titulo.innerHTML = 'Reclamos ingresados (los más recientes primero)';
    let br = document.createElement('br');
    articulo.appendChild(h3Titulo);
    articulo.appendChild(br);
    if (arrayReclamos.length > 0) {
        for (let i = arrayReclamos.length - 1; i >= 0; i = i - 1) {
            let reclamo = arrayReclamos[i]
            let cantidad = reclamo.mePaso;
            let nombre = reclamo.nombreReclamo;
            let empresa = reclamo.empresaReclamo.nombreEmpresa;
            let tituloReclamo = reclamo.tituloReclamo;
            let contenidoReclamo = reclamo.reclamo;
            let nroReclamo = reclamo.numeroReclamo;
            let h3Reclamo = document.createElement('h3');
            let nodo = document.createTextNode("Reclamo Nro. " + nroReclamo);
            h3Reclamo.appendChild(nodo);
            articulo.appendChild(h3Reclamo);
            let divPrincipal = document.createElement('div');
            divPrincipal.classList.add('reclamos-ingresados__reclamo');
            let idDiv = "divMePaso" + nroReclamo;
            divPrincipal.innerHTML = '<div class = "reclamos-ingresados__reclamo"><div class = "reclamos-ingresados__contenido"><div class = "contenido-reclamos"><p>' + nombre +': <span class = "fondo-naranja">' + tituloReclamo + '</span></p> <p>Empresa: <span class = "fondo-verde">' + empresa + '</span></p> <p>' + contenidoReclamo + '</p><div class = "me-paso" id = ' + idDiv + '></div></div></div>';
            document.getElementById("reclamos-ingresados").appendChild(divPrincipal);
            let divBoton = document.getElementById(idDiv);
            let boton = document.createElement("button");
            let pContador = document.createElement("p");
            boton.innerHTML = "¡A mí también me pasó!";
            boton.setAttribute("id", nroReclamo);
            pContador.innerHTML = "Contador: <span id = 'spanContador" + nroReclamo + "'>"+ cantidad + "</span>";
            pContador.setAttribute("id", "contador" + nroReclamo);
            divBoton.appendChild(boton);
            divBoton.appendChild(pContador);
            boton.addEventListener("click", function() {botonApretado(boton, reclamo);});
        }
    }
    else {
        let reclamos = document.getElementById('reclamos-ingresados');
        let h4SinDatos = document.createElement('h4');
        h4SinDatos.innerHTML = 'Sin datos';
        reclamos.appendChild(h4SinDatos);
    }
}


function botonApretado(boton, reclamo) {
    let idApretado = boton.id;
    let parrafo = document.getElementById("contador" + idApretado);
    let idContador = "spanContador" + idApretado;
    let cantidad = reclamo.mePaso;
    cantidad = parseInt(cantidad);
    cantidad ++;
    parrafo.innerHTML = "Contador: <span id = '"  + idContador + "'" + ">" + cantidad + "</span>";
    reclamo.mePaso = parseInt(cantidad);
    let nombreEmpresaReclamada = (sistema.reclamos[parseInt(idApretado) - 1]).empresaReclamo.nombreEmpresa;
    for (let i = 0; i < sistema.empresas.length; i++) {
        let empresa = sistema.empresas[i];
        let nombreEmpresa = empresa.nombreEmpresa;
        if (nombreEmpresaReclamada == nombreEmpresa) {
            empresa.sumarReclamo();
        }
        actualizarEstadisticas(sistema.getUltimaLetra());
    }
}

function actualizarEstadisticas(letraActivada) {
    crearBotonesLetras();
    crearTabla(letraActivada);
    document.getElementById("promedioReclamos").innerText = "El promedio de las cantidades considerando todos los reclamos de todas las empresas es: " + sistema.promedioReclamos();
    document.getElementById("totalEmpresas").innerText = "Total de empresas registradas: " + sistema.empresas.length;
    actualizarListaEmpresasSinReclamo();
    actualizarRubroMaximo();
}

function crearTabla(letraActivada) {
    let radioAsc = document.getElementById('radio1');
    let ascendente = radioAsc.checked;
    let listaEmpresas = sistema.darEmpresasOrdenadas(ascendente);
    letraActivada = letraActivada.toUpperCase();
    sistema.cambiarUltimaLetra(letraActivada);
    let divTabla = document.getElementById("idTablaEstadisticas")
    divTabla.innerHTML = '<caption id = "captionTabla">Empresas: Todas</caption><tr><th>Nombre</th><th>Dirección</th><th>Rubro</th><th>Cantidad</th></tr>';
    let caption = document.getElementById('captionTabla');
    for (let i = 0; i < listaEmpresas.length; i++) {
        let empresa = listaEmpresas[i];
        let nombreEmpresa = empresa.nombreEmpresa;
        if (letraActivada != '*') {
            if (nombreEmpresa[0].toUpperCase() === letraActivada) {
                let fila = document.createElement('tr');
                let colNombre = document.createElement('th');
                let colDireccion = document.createElement('th');
                let colRubro = document.createElement('th');
                let colCantidad = document.createElement('th');
                colNombre.innerHTML = empresa.nombreEmpresa;
                colDireccion.innerHTML = empresa.direccionEmpresa;
                colRubro.innerHTML = empresa.rubroEmpresa;
                colCantidad.innerHTML = empresa.cantidadReclamos;
                fila.appendChild(colNombre);
                fila.appendChild(colDireccion);
                fila.appendChild(colRubro);
                fila.appendChild(colCantidad);
                divTabla.appendChild(fila);
                caption.innerHTML = 'Empresas que empiezan con ' + letraActivada;
            }
        } else {
            let fila = document.createElement('tr');
            let colNombre = document.createElement('th');
            let colDireccion = document.createElement('th');
            let colRubro = document.createElement('th');
            let colCantidad = document.createElement('th');
            colNombre.innerHTML = empresa.nombreEmpresa;
            colDireccion.innerHTML = empresa.direccionEmpresa;
            colRubro.innerHTML = empresa.rubroEmpresa;
            colCantidad.innerHTML = empresa.cantidadReclamos;
            fila.appendChild(colNombre);
            fila.appendChild(colDireccion);
            fila.appendChild(colRubro);
            fila.appendChild(colCantidad);
            divTabla.appendChild(fila);
            caption.innerHTML = 'Empresas: Todas';
        }
            
    }
}


function crearBotonesLetras() {
    let listaLetras = sistema.listaLetrasEmpresa();
    let divBotones = document.getElementById('AT');
    divBotones.innerHTML = '';
    listaLetras.sort()
    for (let letra of listaLetras) {
        letra = letra.toUpperCase();
        let botonLetra = document.createElement('input')
        botonLetra.type = 'button';
        botonLetra.value = letra;
        botonLetra.id = letra;
        divBotones.appendChild(botonLetra);
        botonLetra.addEventListener('click', function() {botonFiltroLetras(botonLetra.id)});
    }
    //agregamos el boton de todas las letras
    let ultimoBoton = document.createElement('input');
    ultimoBoton.type = 'button';
    ultimoBoton.value = "*";
    divBotones.appendChild(ultimoBoton);
    ultimoBoton.classList.add('fondo-verde');
}

// Si se toca una letra se ejecuta la función, vuelve a crear los botones, pero aplica el filtro
function botonFiltroLetras(letraSeleccionada) {
    let listaLetras = sistema.listaLetrasEmpresa();
    let divBotones = document.getElementById('AT');
    divBotones.innerHTML = '';
    listaLetras.sort()
    listaLetras.push('*');
    for (let letra of listaLetras) {
        if (letra.toUpperCase() != letraSeleccionada) {
            letra = letra.toUpperCase();
            let botonLetra = document.createElement('input')
            botonLetra.type = 'button';
            botonLetra.value = letra;
            botonLetra.id = letra;
            divBotones.appendChild(botonLetra);
            botonLetra.addEventListener('click', function() {botonFiltroLetras(botonLetra.id)});
        }

        else {
            letra = letra.toUpperCase();
            let botonVerde = document.createElement('input')
            botonVerde.type = 'button';
            botonVerde.value = letra;
            botonVerde.id = letra;
            botonVerde.classList.add('fondo-verde');
            divBotones.appendChild(botonVerde);
            crearTabla(letra);
        }
    }
}

function lupaBuscar() {
    let textoBuscador = document.getElementById('buscador');
    if (textoBuscador.reportValidity()) {
        if (sistema.darReclamos("").length > 0) {
            texto = textoBuscador.value;
            textoBuscador.value = '';
            actualizarReclamosMostrados(sistema.darReclamos(texto));
            mostrarReclamosIngresados();
        }
        else {
            alert("Debe agregar reclamos antes de llevar a cabo una búsqueda.");
            textoBuscador.value = '';
        }
    }  
}

function actualizarListaEmpresasSinReclamo(){
    let empresasSinReclamo = sistema.empresasSinReclamos();
    let ul = document.getElementById("listaEmpresasSinReclamo");
    ul.innerHTML = "";
    for (let empresa of empresasSinReclamo) {
        let nombreEmpresa = empresa.nombreEmpresa;
        let direccionEmpresa = empresa.direccionEmpresa;
        let rubroEmpresa = empresa.rubroEmpresa;
        let texto = `${nombreEmpresa} (${direccionEmpresa}) Rubro: ${rubroEmpresa}`
        let li = document.createElement("li");
        li.innerText = texto;
        ul.appendChild(li);
    }
    if (empresasSinReclamo.length === 0) {
        let li = document.createElement("li");
        li.innerText = 'Sin datos';
        ul.appendChild(li);   
    }
}

function actualizarRubroMaximo(){
    let rubroMaximo = sistema.getRubroMaximo();
    let listaRubros = rubroMaximo[0];
    let cantidadReclamos = rubroMaximo [1];
    let tabla = document.getElementById('listaRubrosMax');
    tabla.innerHTML = '';
    if (rubroMaximo.length > 0) {
        for (let rubro of listaRubros) {
            let li = document.createElement('li');
            li.innerHTML = `${rubro}: cantidad ${cantidadReclamos}`;
            tabla.appendChild(li);
        }
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = 'Sin datos';
        tabla.appendChild(li);
    } 
}
