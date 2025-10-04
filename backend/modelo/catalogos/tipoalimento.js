const sql = require('pg');
var os = require('os');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

/* Tipo Alimento */

// Listar tipos de alimentos activos
module.exports.ListadoTipoAlimentoActivos = async function () {
    var sentencia;
    sentencia = "SELECT * FROM donacion.tb_tipo_alimento WHERE tipo_alimento_blestado = true";
    try {
        const resp = await execCentralizada(sentencia, "OK", "OK");
        return resp;
    } catch (error) {
        return { data: "Error: " + error };
    }
};

// Listar todos los tipos de alimentos
module.exports.ListadoTipoAlimento = async function () {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_tipo_alimento($1, $2, $3, $4, $5)';
    var listaParametros = ['TODO', null, null, null, null];
    try {
        const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
        return resp;
    } catch (error) {
        return { data: "Error: " + error };
    }
};

// Obtener tipo de alimento por ID
module.exports.ObtenerTipoAlimentoDadoId = async function (idTipoAlimento) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_tipo_alimento($1, $2, $3, $4, $5)';
    var listaParametros = ['UNO', idTipoAlimento, null, null, null];
    try {
        const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
        return resp;
    } catch (error) {
        return { data: "Error: " + error };
    }
};

// Crear un nuevo tipo de alimento
module.exports.CrearTipoAlimento = async function (strNombre, strDescripcion) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_tipo_alimento($1, $2, $3, $4, $5)';
    var listaParametros = ['IN', null, strNombre, strDescripcion, null];
    try {
        const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
        return resp;
    } catch (error) {
        return { data: "Error: " + error };
    }
};

// Actualizar un tipo de alimento
module.exports.ActualizarTipoAlimento = async function (idTipoAlimento, strNombre, strDescripcion) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_tipo_alimento($1, $2, $3, $4, $5)';
    var listaParametros = ['UP', idTipoAlimento, strNombre, strDescripcion, null];
    try {
        const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
        return resp;
    } catch (error) {
        return { data: "Error: " + error };
    }
};

// Cambiar el estado de un tipo de alimento
module.exports.ActualizarTipoAlimentoEstado = async function (idTipoAlimento, blEstado) {
    var sentencia;
    sentencia = 'SELECT * FROM donacion.f_central_tb_tipo_alimento($1, $2, $3, $4, $5)';
    var listaParametros = ['UPE', idTipoAlimento, null, null, blEstado];
    try {
        const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
        return resp;
    } catch (error) {
        return { data: "Error: " + error };
    }
};
