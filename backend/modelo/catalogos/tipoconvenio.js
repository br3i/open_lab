const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

/*TipoConvenio*/

module.exports.ListadoTipoConvenioTodos = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_convenio($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['TODO', null, null, null,null,null]
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


module.exports.ListadoTipoConvenioActivos = async function () {
  var sentencia;
  sentencia = "SELECT * FROM convenio.tb_tipo_convenio WHERE tipoconvenio_blestado= TRUE"
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

module.exports.ObtenerTipoConvenioDadoId = async function (idTipoConvenio) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_convenio($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UNO', idTipoConvenio, null, null,null,null]
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
module.exports.CrearTipoConvenio = async function (objTipoConvenio) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_convenio($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['IN',null,objTipoConvenio.tipoconvenio_strnombre,objTipoConvenio.tipoconvenio_strdescripcion ,null,null]
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
module.exports.ActualizarTipoConvenio = async function (objTipoConvenio) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_convenio($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UP',objTipoConvenio.idtipoconvenio, objTipoConvenio.tipoconvenio_strnombre,objTipoConvenio.tipoconvenio_strdescripcion,null, null]
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
module.exports.ActualizarTipoConvenioEstado = async function (idTipoConvenio, tipoconvenio_blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_convenio($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UPE', idTipoConvenio, null,null, tipoconvenio_blestado,null]
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


