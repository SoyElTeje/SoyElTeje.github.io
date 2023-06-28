//Autor: Lucas Tejería (307630)

class Sistema {
    constructor() {
        this.empresas = [];
        this.reclamos = [];
        this.ultimaLetraBuscada = '*';
    }
    agregarEmpresa(empresa) {
        this.empresas.push(empresa);
    }
    darTodas() {
        return this.empresas;
    }
    darEmpresasOrdenadas(ascendente) {
        let listaEmpresas = this.darTodas();
        if (ascendente) {
            listaEmpresas.sort(function(primero, segundo){
                return primero.compararAsc(segundo);
            });
        }
        else {
            listaEmpresas.sort(function(primero, segundo){
                return primero.compararDesc(segundo);
            });
        }
        return listaEmpresas;
    }
    darReclamos(texto) {
        let lista = [];
        if (texto === '') {
            lista = this.reclamos;
        }
        else {
            for (let i = 0; i < this.reclamos.length; i++) {
                let reclamo = this.reclamos[i];
                if (reclamo.tituloReclamo.includes(texto) || reclamo.empresaReclamo.nombreEmpresa.includes(texto) || reclamo.nombreReclamo.includes(texto) || reclamo.reclamo.includes(texto)) {
                    lista.push(reclamo);
                }
            }
        }
        return lista;
    }
    agregarReclamo(reclamo, empresaReclamo) {
        cantidadReclamos += 1;
        for (let cadaEmpresa of this.darTodas()) {
            if (cadaEmpresa.nombreEmpresa == empresaReclamo) {
                cadaEmpresa.sumarReclamo();
            }
        }
        this.reclamos.push(reclamo);
    }
    yaExisteEmpresa(empresaAVerificar) {
        let resultado = false;
        if (this.darTodas().length > 0) {
            for (let empresa of this.darTodas()) {
                if (empresa.nombreEmpresa == empresaAVerificar) {
                    resultado = true;
                }
            }
        }
        return resultado;
    }
    listaLetrasEmpresa() {
        let listaLetrasEmpresas = [];
        for (let i = 0; i < this.empresas.length; i++) {
            let empresa = this.empresas[i];
            let nombreEmpresa = empresa.nombreEmpresa;
            if (!listaLetrasEmpresas.includes(nombreEmpresa.charAt(0))) {
                listaLetrasEmpresas.push(nombreEmpresa.charAt(0));
            }

        }
        return listaLetrasEmpresas;
    }
    buscarEmpresaNombre(nombreEmpresaReclamada) {
        let empresaReturn;
        for (let empresa of this.darTodas()) {
            if (empresa.nombreEmpresa == nombreEmpresaReclamada) {
                empresaReturn = empresa;
            }
        }
        return empresaReturn;
    }
    cambiarUltimaLetra(letra) {
        this.ultimaLetraBuscada = letra;
    }
    getUltimaLetra() {
        return this.ultimaLetraBuscada;
    }
    promedioReclamos() {
        let promedio = 'No hay datos';
        if (this.reclamos.length > 0) {
            let totalReclamos = 0;
            for (let empresa of this.empresas) {
                totalReclamos += empresa.cantidadReclamos;
            }
            promedio = Math.round(totalReclamos/this.empresas.length);
        }
        return promedio;
    }
    empresasSinReclamos() {
        let lista = [];
        let listaEmpresas = this.darTodas();
        for (let empresa of listaEmpresas) {
            if (empresa.cantidadReclamos == 0) {
                lista.push(empresa);
            }
        }
        lista.sort(function(primero, segundo){
            return primero.compararAsc(segundo);
        });
        return lista;
    }
   getRubroMaximo() {
        // 0: viajes, 1: restaurantes, 2: bancos, 3: muebles, 4: autos, 5: servicios, 6: general
        let listaNombreRubros = ['Viajes', 'Restaurantes', 'Bancos', 'Muebles', 'Autos', 'Servicios', 'General'];
        let listaRubros = [0, 0, 0, 0, 0, 0, 0];
        let listaEmpresas = this.darTodas();
        for (let empresa of listaEmpresas) {
            if (empresa.rubroEmpresa === 'Viajes') {
                listaRubros[0] += empresa.cantidadReclamos;
            } 
            else if (empresa.rubroEmpresa === 'Restaurantes') {
                listaRubros[1] += empresa.cantidadReclamos;
            }
            else if (empresa.rubroEmpresa === 'Bancos') {
                listaRubros[2] += empresa.cantidadReclamos;
            }
            else if (empresa.rubroEmpresa === 'Muebles') {
                listaRubros[3] += empresa.cantidadReclamos;
            }
            else if (empresa.rubroEmpresa === 'Autos') {
                listaRubros[4] += empresa.cantidadReclamos;
            }
            else if (empresa.rubroEmpresa === 'Servicios') {
                listaRubros[5] += empresa.cantidadReclamos;
            }
            else if (empresa.rubroEmpresa === 'General') {
                listaRubros[6] += empresa.cantidadReclamos;
            }
        }
        let indexMaximos = [];
        let maximo = Math.max.apply(null, listaRubros);
        let retorno = [];
        if (maximo > 0) {
            let resultado = 0;
            let desde = 0;
            while (resultado != -1) {
                resultado = listaRubros.indexOf(maximo, desde);
                if (resultado != -1) {
                    indexMaximos.push(resultado);
                    desde = resultado + 1;
                }
            }
            let maximosRubros = [];
            for (let index of indexMaximos) {
                maximosRubros.push(listaNombreRubros[index]);
            }
            retorno = [maximosRubros, maximo];
        }
        
        return retorno;
   }
}

class Empresa {
    constructor(nombre, direccion, rubro,) {
        this.nombreEmpresa = nombre;
        this.direccionEmpresa = direccion;
        this.rubroEmpresa = rubro;
        this.cantidadReclamos = 0;
    }

    sumarReclamo() {
        this.cantidadReclamos += 1;
    }

    getNombreEmpresa() {return this.nombreEmpresa;}

    compararAsc(empresaDos) {
        return this.getNombreEmpresa().toUpperCase().localeCompare(empresaDos.getNombreEmpresa().toUpperCase());
    }

    compararDesc(empresaDos) {
        return empresaDos.getNombreEmpresa().toUpperCase().localeCompare(this.getNombreEmpresa().toUpperCase());
    }
}

class Reclamo {
    constructor (nombre, empresa, tituloReclamo, reclamo, nroReclamo) {
        this.nombreReclamo = nombre;
        this.empresaReclamo = empresa;
        this.tituloReclamo = tituloReclamo;
        this.reclamo = reclamo;
        this.mePaso = 1;
        this.numeroReclamo = nroReclamo;
    }
}



