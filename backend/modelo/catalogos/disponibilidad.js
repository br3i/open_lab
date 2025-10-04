const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');


/*Disponibilidad*/

module.exports.ListadoDisponibilidad = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_disponibilidad($1, $2, $3, $4)'
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
module.exports.ObtenerDisponibilidadDadoId = async function (idDisponibilidad) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_disponibilidad($1, $2, $3, $4)'
  var listaParametros = ['UNO', idDisponibilidad, null, null]
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
module.exports.CrearDisponibilidad = async function (strnombre) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_disponibilidad($1, $2, $3, $4)'
  var listaParametros = ['IN',null,strnombre,null]
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
module.exports.ActualizarDisponibilidad = async function (idDisponibilidad, strnombre) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_disponibilidad($1, $2, $3, $4)'
  var listaParametros = ['UP',idDisponibilidad,strnombre, null]
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
module.exports.ActualizarDisponibilidadEstado = async function (idDisponibilidad, blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_tb_disponibilidad($1, $2, $3, $4)'
  var listaParametros = ['UPE', idDisponibilidad, null, blestado]
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
