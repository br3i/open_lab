const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');



module.exports.ListadoClausulaTodos = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_clausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['TODO', null, null, null, null,null]
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

module.exports.ListadoClausulaActivos = async function () {
    var sentencia;
    sentencia = "SELECT * FROM convenio.tb_clausula WHERE clausula_blestado= TRUE"
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

module.exports.CrearClausula = async function (objClausula) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_clausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['IN', null,objClausula.clausula_strtitulo,objClausula.clausula_strdescripcion,null, null]
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

module.exports.ActualizarClausula = async function (objClausula) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_clausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['UP',objClausula.idclausula,objClausula.clausula_strtitulo,objClausula.clausula_strdescripcion,null, null]
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

module.exports.ActualizarClausulaEstado = async function (idClausula, blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_clausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['UPE', idClausula, null,null, blestado,null]
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

module.exports.ObtenerClausulaDadoId = async function (idClausula) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_clausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['UNO', idClausula, null, null, null, null]
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

module.exports.CrearRelacionClausulaSubclausula = async function (clau_sub_idClausula,clau_sub_idSubclausula) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_clausula_subclausula($1, $2, $3, $4, $5)'
    var listaParametros = ['IN', clau_sub_idClausula,clau_sub_idSubclausula,null, null]
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

