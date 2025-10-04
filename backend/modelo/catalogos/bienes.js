const { execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

module.exports.ListarBienes = async function (estado) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_vw_catalogo_bienes($1,$2,$3,$4,$5)';
  var listaParametros = ['TODO', null, null, null, estado];

  try {
    if (sentencia != "") {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return (resp);
    } else {
      return { data: "vacio sql" }
    }
  } catch (error) {
    return { data: "Error: " + error }
  }
}

module.exports.ListarBienesPorTipo = async function (idTipoBien, estado) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_vw_catalogo_bienes($1,$2,$3,$4,$5)';
  var listaParametros = ['TIPO', null, idTipoBien, null, estado];

  try {
    if (sentencia != "") {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return (resp);
    } else {
      return { data: "vacio sql" }
    }
  } catch (error) {
    return { data: "Error: " + error }
  }
}

module.exports.ObtenerBien = async function (idBien, estado) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_vw_catalogo_bienes($1,$2,$3,$4,$5)';
  var listaParametros = ['UNO', idBien, null, null, estado];

  try {
    if (sentencia != "") {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return (resp);
    } else {
      return { data: "vacio sql" }
    }
  } catch (error) {
    return { data: "Error: " + error }
  }
}

module.exports.BuscarBienes = async function (texto , estado ) {
  var sentencia;
  sentencia = 'SELECT * FROM procesos.f_central_vw_catalogo_bienes($1,$2,$3,$4,$5)';
  var listaParametros = ['BUSCAR', null, null, texto, estado];

  try {
    if (sentencia != "") {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return (resp);
    } else {
      return { data: "vacio sql" }
    }
  } catch (error) {
    return { data: "Error: " + error }
  }
}



