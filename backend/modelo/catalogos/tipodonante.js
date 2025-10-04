const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

/*Tipodonante*/

module.exports.ListadoTipoDonanteTodos = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_donante($1, $2, $3, $4, $5, $6)'
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

module.exports.ListadoTipoDonanteActivos = async function () {
  var sentencia;
  sentencia = "SELECT * FROM convenio.tb_tipo_donante WHERE tipodonante_blestado= TRUE"
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

module.exports.ObtenerTipoDonanteDadoId = async function (idTipoDonante) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_donante($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UNO', idTipoDonante, null, null,null,null]
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
module.exports.CrearTipoDonante = async function (objTipoDonante) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_donante($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['IN',null,objTipoDonante.tipodonante_strnombre,objTipoDonante.tipodonante_strdescripcion ,null,null]
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
module.exports.ActualizarTipoDonante = async function (objTipoDonante ) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_donante($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UP',objTipoDonante.idtipodonante, objTipoDonante.tipodonante_strnombre,objTipoDonante.tipodonante_strdescripcion,null, null]
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
module.exports.ActualizarTipoDonanteEstado = async function (idTipoDonante, TipoDonante_blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_tipo_donante($1, $2, $3, $4, $5, $6)'      
  var listaParametros = ['UPE', idTipoDonante, null,null, TipoDonante_blestado,null]
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


