const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');


/* Tipo Voluntario */

module.exports.ListadoTipoVoluntario = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_voluntario($1, $2, $3, $4)'
    var listaParametros = ['TODO', null, null, null]
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

module.exports.ObtenerTipoVoluntarioDadoId = async function (idTipo) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_voluntario($1, $2, $3, $4)'
    var listaParametros = ['UNO', idTipo, null, null]
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

module.exports.CrearTipoVoluntario = async function (strnombre) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_voluntario($1, $2, $3, $4)'
    var listaParametros = ['IN', null, strnombre, null]
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

module.exports.ActualizarTipoVoluntario = async function (idTipo, strnombre) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_voluntario($1, $2, $3, $4)'
    var listaParametros = ['UP', idTipo , strnombre, null]
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
module.exports.ActualizarTipoVoluntarioEstado = async function (idTipo, blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_tipo_voluntario($1, $2, $3, $4)'
    var listaParametros = ['UPE', idTipo, null, blestado]
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