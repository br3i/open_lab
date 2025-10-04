const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

/* Tipo discapacidad */

module.exports.ListadoTipoDiscapacidad = async function () {
    var sentencia; 
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_discapacidad($1, $2, $3, $4,$5)'
    var listaParametros = ['TODO', null, null, null,null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }

}

module.exports.ListadoTipoDiscapacidadActivo = async function () {
    var sentencia; 
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_discapacidad($1, $2, $3, $4,$5)'
    var listaParametros = ['LISTACT', null, null, null,null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }

}


module.exports.ObtenerTipoDiscapacidadDadoId = async function (iddiscapacidad) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_discapacidad($1, $2, $3, $4, $5)'
    var listaParametros = ['UNO', iddiscapacidad, null, null,null,null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }

}

module.exports.CrearTipoDiscapacidad = async function (discapacidad_strnombre,discapacidad_strdescripcion) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_discapacidad($1, $2, $3, $4,$5)'
    var listaParametros = ['IN',null, discapacidad_strnombre, discapacidad_strdescripcion,null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }

}

module.exports.ActualizarTipoDiscapacidad = async function (iddiscapacidad, discapacidad_strnombre, discapacidad_strdescripcion) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_discapacidad($1, $2, $3, $4, $5)'
    var listaParametros = ['UP', iddiscapacidad, discapacidad_strnombre, discapacidad_strdescripcion,null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }
}

module.exports.ActualizarTipoDiscapacidadEstado = async function (iddiscapacidad, discapacidad_blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_discapacidad($1, $2, $3, $4,$5)'
    var listaParametros = ['UPE', iddiscapacidad, null, discapacidad_blestado,null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }

}