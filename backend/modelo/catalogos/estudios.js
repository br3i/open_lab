const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

/* Estudio */

module.exports.ListadoEstudios = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_estudio($1, $2, $3, $4)'
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

module.exports.ObtenerEstudiosDadoId = async function (idEstudios) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_estudio($1, $2, $3, $4)'
    var listaParametros = ['UNO', idEstudios, null, null]
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

module.exports.CrearEstudios = async function (strnombre) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_estudio($1, $2, $3, $4)'
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

module.exports.ActualizarEstudios = async function (idEstudios, strnombre) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_estudio($1, $2, $3, $4)'
    var listaParametros = ['UP', idEstudios, strnombre, null]
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

module.exports.ActualizarEstudiosEstado = async function (idEstudios, blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM procesos.f_central_tb_estudio($1, $2, $3, $4)'
    var listaParametros = ['UPE', idEstudios, null, blestado]
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

