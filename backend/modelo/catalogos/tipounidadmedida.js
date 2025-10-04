const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('./../../config/execSQLCentralizada.helper');

/*UnidadMedida*/

module.exports.ListadoUnidadMedidaTodos = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_unidad_medida($1, $2, $3, $4, $5, $6)'
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
  
  module.exports.ListadoUnidadMedidaActivos = async function () {
    var sentencia;
    sentencia = "SELECT * FROM donacion.tb_unidad_medida WHERE unidad_blestado= TRUE"
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
  
  module.exports.ObtenerUnidadMedidaDadoId = async function (idUnidadMedida) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_unidad_medida($1, $2, $3, $4, $5, $6)'
    var listaParametros = ['UNO', idUnidadMedida, null, null, null, null]
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
  module.exports.CrearUnidadMedida = async function (objUnidadMedida) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_unidad_medida($1, $2, $3, $4, $5, $6)'
    var listaParametros = ['IN', null, objUnidadMedida.unidad_strnombre, objUnidadMedida.unidad_strabreviatura, null, null]
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
  module.exports.ActualizarUnidadMedida = async function (objUnidadMedida) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_unidad_medida($1, $2, $3, $4, $5, $6)'
    var listaParametros = ['UP', objUnidadMedida.idunidadmedida, objUnidadMedida.unidad_strnombre, objUnidadMedida.unidad_strabreviatura, null, null]
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
  module.exports.ActualizarUnidadMedidaEstado = async function (idUnidadMedida, unidad_blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_unidad_medida($1, $2, $3, $4, $5, $6)'
    var listaParametros = ['UPE', idUnidadMedida, null, null, unidad_blestado, null]
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
  