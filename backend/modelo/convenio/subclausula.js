const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

module.exports.ListadoSubclausulaTodos = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_subclausula($1, $2, $3, $4, $5 ,$6)'
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

module.exports.ListadoSubclausulaActivos = async function () {
    var sentencia;
    sentencia = "SELECT * FROM convenio.tb_subclausula WHERE subclausula_blestado= TRUE"
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

module.exports.CrearSubclausula = async function (objSubclausula) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_subclausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['IN', null,objSubclausula.subclausula_strtitulo,objSubclausula.subclausula_strdescripcion,null, null]
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

module.exports.ActualizarSubclausula = async function (objSubclausula) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_subclausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['UP', objSubclausula.idsubclausula,objSubclausula.subclausula_strtitulo,objSubclausula.subclausula_strdescripcion,null, null]
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

module.exports.ActualizarSubclausulaEstado = async function (idSubclausula, blestado) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_subclausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['UPE', idSubclausula, null,null, blestado,null]
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

module.exports.ObtenerSubclausulaDadoId = async function (idSubclausula) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_subclausula($1, $2, $3, $4, $5 ,$6)'
    var listaParametros = ['UNO', idSubclausula, null, null, null, null]
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

module.exports.ListaSubclausulaDadoIdclausula = async function (idClausula) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_clausula_subclausula($1, $2, $3, $4, $5)'
    var listaParametros = ['CLAU', idClausula, null, null, null]
    try {

        if (sentencia != "") {
            const resp = await execCentralizadaProcedimientos(sentencia,listaParametros, "OK", "OK");

            return (resp)
        } else {
            return { data: "vacio sql" }
        }
    } catch (error) {
        return { data: "Error: " + error }
    }

}

module.exports.CrearRelacionSubclausulaItems = async function (sub_items_idSubclausula,sub_items_idItems) {
    var sentencia;
    sentencia =  'SELECT * FROM convenio.f_central_tb_subclausula_items($1, $2, $3, $4, $5)'
    var listaParametros = ['IN', sub_items_idSubclausula,sub_items_idItems,null, null]
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




