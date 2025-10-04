const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('./../../config/execSQLCentralizada.helper');

module.exports.ListadoTipoDonacionTodos = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM donacion.f_central_tb_tipo_donacion($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['TODO', null, null, null, null, null]
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

module.exports.ListadoTipoDonacionActivos = async function () {
  var sentencia;
  sentencia = "SELECT * FROM donacion.tb_tipo_donacion WHERE tipo_donacion_blestado= TRUE"
  try {

    if (sentencia != "") {
      const resp = await execCentralizada(sentencia, "OK", "OK");
      return (resp)
    } else {
      return { data: "vacio sql" }
    }
  } catch (error) {
    return { data: "Error: " + error }
  }

}
