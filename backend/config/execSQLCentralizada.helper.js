const { Pool } = require('pg');
const CONFIGCENTRALIZADA = require('./../config/databaseCentral');
const { Client } = require('pg');


// Función para inicializar un pool dinámico
const iniciarBancoAlimentosPool = async (db) => {
  try {
    var conex = { ...CONFIGCENTRALIZADA, database: db };
    const pool = new Pool(conex);
    return pool;
  } catch (error) {
    console.error("Error al inicializar el pool:", error);
    throw error;
  }
};


// Ejecutar consultas dentro de una transacción
const execTransaccion = async (client, SQL, listaParametros = [], OK = "", msgVacio = "", msgError = null) => {
  try {
    console.log('***********************************');
    console.log(SQL);
    console.log(listaParametros);
    const result = await client.query(SQL, listaParametros);
    return buildResponse(result, OK, msgVacio, msgError);
  } catch (error) {
    console.log("Error en transacción:", error);
    throw new Error(`${mensajeError}: ${error.message}`); // Lanza el error hacia arriba
  }
};


const execCentralizada = async (SQL, OK = "", msgVacio = "", msgError = null) => {
  var conex = CONFIGCENTRALIZADA;
  var client = new Client(conex);
  try {
    client.connect();
    console.log('***********************************')
    console.log(SQL)
    const result = await client.query(SQL);
    return buildResponse(result, OK, msgVacio, msgError);
  } catch (err) {
    console.log("Error conexion Base Centralizada:" + err);
    return handleDatabaseError(err, msgError);
  } finally {
    if (client) {
      await client.end();
    }
  }

};
const execCentralizadaProcedimientos = async (SQL, listaParametros, OK = "", msgVacio = "", msgError = null) => {
  var conex = CONFIGCENTRALIZADA;
  var client = new Client(conex);
  try {
    client.connect();
    console.log('***********************************')
    console.log(SQL)
    console.log(listaParametros)
    const result = await client.query(SQL, listaParametros);
    return buildResponse(result, OK, msgVacio, msgError);
  } catch (err) {
    console.log("Error conexion Base Centralizada:" + err);
    return handleDatabaseError(err, msgError);
  } finally {
    if (client) {
      await client.end();
    }
  }

};

const buildResponse = (res, OK, msgVacio, msgError) => {
  const count = res.rowCount == undefined ? 0 : res.rowCount;
  const message = res.rowCount > 0 ? OK : msgVacio;
  const data = res.rows ?? [];
  return { count, message, data };
};

const handleDatabaseError = (err, msgError) => {
  if (err instanceof sql.ConnectionError) {
    return {
      count: -1,
      message: "Error de conexión a la base de datos. " + err,
      data: [],
    };
  } else {
    return {
      count: -1,
      message: msgError ?? err.originalError.info.message,
      data: [],
    };
  }
};




module.exports = { execCentralizada, execCentralizadaProcedimientos, execTransaccion, iniciarBancoAlimentosPool };
