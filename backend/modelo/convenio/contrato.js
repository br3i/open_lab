const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

module.exports.ListadoContratoTodos = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_contrato($1, $2, $3, $4, $5 ,$6,$7)'
    var listaParametros = ['TODO', null, null, null, null,null,null]
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

module.exports.ListadoContratoActivos = async function () {
    var sentencia;
    sentencia = "SELECT * FROM convenio.tb_contrato WHERE contrato_blestado= TRUE"
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

module.exports.CrearContrato = async function (objContrato) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_contrato($1, $2, $3, $4, $5 ,$6,$7)'
    var listaParametros = ['IN', null,objContrato.contrato_stridentificador,objContrato.contrato_strtitulo,objContrato.contrato_strdescripcion,null, null]
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

module.exports.ActualizarContratoEstado = async function (idContrato, blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_contrato($1, $2, $3, $4, $5 ,$6,$7)'
    var listaParametros = ['UPE', idContrato, null,null,null, blestado,null]
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

module.exports.CrearContratoClausula = async function (idContrato, idClausula) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_contrato_clausula($1, $2, $3, $4, $5, $6, $7)'
    var listaParametros = ['INT1',idContrato,null,idClausula,null,null,null]
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

module.exports.CrearContratoClausulaSubClausula = async function (idContrato,idClausula,idSubclausula) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_contrato_clausula($1, $2, $3, $4, $5, $6, $7)'
    var listaParametros = ['INT2',idContrato,idClausula,idSubclausula,null,null,null]
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

module.exports.CrearContratoSubclausulaItems = async function (idContrato,idSubclausula,idItems) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_contrato_clausula($1, $2, $3, $4, $5, $6, $7)'
    var listaParametros = ['INT3',idContrato,idSubclausula,idItems,null,null,null]
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

//Utilizar para mostrar en un pdf los detalles del contrato
module.exports.ObtenerContratoDetalle = async function (idContrato) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_contrato_clausula($1, $2, $3 ,$4, $5, $6, $7)'
    var listaParametros = ['LIST', idContrato,null, null, null, null, null ]
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



