const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

/* Tipo enfermedad */

module.exports.ListadoClasfEnfermedad = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM proceso.f_central_clasificacion_enfermedad($1, $2, $3, $4,$5)'
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

module.exports.ListadoClasfEnfermedadActivo = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM proceso.f_central_clasificacion_enfermedad($1, $2, $3, $4,$5)'
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

module.exports.ObtenerClasfEnfermedadDadoId = async function (idenfermedad) {
    var sentencia;
    sentencia = 'SELECT * FROM proceso.f_central_clasificacion_enfermedad($1, $2, $3, $4, $5)'
    var listaParametros = ['UNO', idenfermedad, null, null,null,null]
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

module.exports.CrearClasfEnfermedad = async function (enfermedad_strnombre,enfermedad_strdescripcion) {
    var sentencia;
    sentencia = 'SELECT * FROM proceso.f_central_clasificacion_enfermedad($1, $2, $3, $4,$5)'
    var listaParametros = ['IN',null, enfermedad_strnombre, enfermedad_strdescripcion,null]
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

module.exports.ActualizarClasfEnfermedad = async function (idenfermedad, enfermedad_strnombre, enfermedad_strdescripcion) {
    var sentencia;
    sentencia = 'SELECT * FROM proceso.f_central_clasificacion_enfermedad($1, $2, $3, $4, $5)'
    var listaParametros = ['UP', idenfermedad, enfermedad_strnombre, enfermedad_strdescripcion,null]
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

module.exports.ActualizarClasfEnfermedadEstado = async function (idenfermedad, enfermedad_blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM proceso.f_central_clasificacion_enfermedad($1, $2, $3, $4,$5)'
    var listaParametros = ['UPE', idenfermedad, null, enfermedad_blestado,null]
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

//Enfermedad


module.exports.ListadoEnfermedadActivo = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_enfermedad($1, $2, $3, $4,$5)'
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
