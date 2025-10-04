const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('./../config/execSQLCentralizada.helper');

/* Area Conocimiento */

module.exports.ListadoArea = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_area_conocimiento($1, $2, $3, $4)'
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

module.exports.ObtenerAreaDadoId = async function (idArea) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_area_conocimiento($1, $2, $3, $4)'
  var listaParametros = ['UNO', idArea, null, null]
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

module.exports.CrearArea = async function (strnombre) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_area_conocimiento($1, $2, $3, $4)'
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

module.exports.ActualizarArea = async function (idArea, strnombre) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_area_conocimiento($1, $2, $3, $4)'
  var listaParametros = ['UP', idArea, strnombre, null]
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
module.exports.ActualizarAreaEstado = async function (idArea, blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_area_conocimiento($1, $2, $3, $4)'
  var listaParametros = ['UPE', idArea, null, blestado]
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
