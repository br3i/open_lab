const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');



    module.exports.ListadoItemTodos = async function () {
        var sentencia;
        sentencia = 'SELECT * FROM convenio.f_central_tb_items($1, $2, $3, $4, $5 ,$6)'
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

    module.exports.ListadoItemActivos = async function () {
        var sentencia;
        sentencia = "SELECT * FROM convenio.tb_items WHERE items_blestado= TRUE"
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

    module.exports.CrearItem = async function (objItem) {
        var sentencia;
        sentencia =  'SELECT * FROM convenio.f_central_tb_items($1, $2, $3, $4, $5 ,$6)'
        var listaParametros = ['IN', null,objItem.items_strtitulo,objItem.items_strdescripcion,null, null]
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

    module.exports.ActualizarItem = async function (objItem) {
        var sentencia;
        sentencia = 'SELECT * FROM convenio.f_central_tb_items($1, $2, $3, $4, $5 ,$6)'
        var listaParametros = ['UP', objItem.iditems,objItem.items_strtitulo,objItem.items_strdescripcion,null, null]
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

    module.exports.ActualizarItemEstado = async function (idItem, blestado) {
        var sentencia;
        sentencia = 'SELECT * FROM convenio.f_central_tb_items($1, $2, $3, $4, $5 ,$6)'
        var listaParametros = ['UPE', idItem, null,null, blestado,null]
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

    module.exports.ObtenerItemDadoId = async function (idItem) {
        var sentencia;
        sentencia = 'SELECT * FROM convenio.f_central_tb_items($1, $2, $3, $4, $5 ,$6)'
        var listaParametros = ['UNO', idItem, null, null, null, null]
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

module.exports.ListaSubclausulaDadoIdsubclausula = async function (idSubclausula) {
    var sentencia;
    sentencia = 'SELECT * FROM convenio.f_central_tb_subclausula_items($1, $2, $3, $4, $5)'
    var listaParametros = ['SUBCL', idSubclausula, null, null, null]
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