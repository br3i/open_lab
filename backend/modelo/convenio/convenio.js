const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper');

module.exports.ListadoConvenioTodos = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio($1, $2, $3, $4, $5 ,$6 ,$7, $8, $9,$10, $11,$12, $13, $14, $15,$16)'
  var listaParametros = ['TODO', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
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

module.exports.ListadoConvenioDadoIdTipoDonnate = async function (idTipoDonante) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio($1, $2, $3, $4, $5 ,$6 ,$7, $8, $9,$10, $11,$12, $13, $14, $15,$16)'
  var listaParametros = ['LISTTD', null, null, null, null, null, null, null, null, null, null, idTipoDonante, null, null, null, null]
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

module.exports.ObtenerConvenioDadoId = async function (idConvenio) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio($1, $2, $3, $4, $5 ,$6 ,$7, $8, $9,$10, $11,$12, $13, $14, $15,$16)'
  var listaParametros = ['UNO', idConvenio, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
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

module.exports.CrearConvenio = async function (objConvenio) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio($1, $2, $3, $4, $5 ,$6 ,$7, $8, $9,$10, $11,$12, $13, $14, $15,$16)'
  var listaParametros = ['IN', null, objConvenio.convenio_strdescripcion, objConvenio.convenio_strtitulo, objConvenio.convenio_strobjetivo, objConvenio.convenio_idcoordinadorbar, objConvenio.convenio_idcoordinadordon,
    objConvenio.convenio_idsolicitud, objConvenio.convenio_iddonante, objConvenio.convenio_dtfechainicio, objConvenio.convenio_dtfechafin, objConvenio.convenio_idtipodonante, objConvenio.convenio_idtipoconvenio, objConvenio.convenio_strobservacion, null, null]
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

//Funciones para Convenio Contrato

module.exports.ListadoConvenioContratoTodos = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_contrato($1, $2, $3, $4, $5, $6)'
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
module.exports.ListadoConvenioContratoActivos = async function () {
  var sentencia;
  sentencia = "	SELECT * FROM convenio.tb_convenio WHERE convenio_dtfechafin >= CURRENT_DATE ORDER BY convenio_dtfechafin DESC;"

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

module.exports.ObtenerConvenioContratoDadoId = async function (idConvenioContrato) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_contrato($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UNO', idConvenioContrato, null, null, null, null]
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

module.exports.CrearConvenioContrato = async function (objConvenioContrato) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_contrato($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['IN', null, objConvenioContrato.conv_cont_idconvenio, objConvenioContrato.conv_cont_idcontrato, null, null]
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

module.exports.ActualizarConvenioContrato = async function (objConvenioContrato) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_contrato($1, $2, $3, $4, $5, $6,$7)'
  var listaParametros = ['UP', objConvenioContrato.idconveniocontrato, objConvenioContrato.conv_cont_idconvenio, objConvenioContrato.conv_cont_idcontrato, null, null]
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

module.exports.ActualizarConvenioContratoEstado = async function (idConvenioContrato, conv_cont_blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_contrato($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UPE', idConvenioContrato, null, null, conv_cont_blestado, null]
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

module.exports.ObtenerConvenioContratoDadoIdConv = async function (conv_cont_idconvenio) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_contrato($1, $2, $3, $4, $5, $6)'
  var listaParametros = ['UNOCC', null, conv_cont_idconvenio, null, null, null]
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

//Funciones para Convenio Anexo

module.exports.ListadoConvenioAnexoTodos = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_anexo($1, $2, $3, $4, $5, $6,$7,$8)'
  var listaParametros = ['TODO', null, null, null, null, null, null, null]
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

module.exports.ListadoConvenioAnexoActivos = async function () {
  var sentencia;
  sentencia = "SELECT * FROM convenio.tb_convenio_anexo WHERE conv_anexo_blestado= TRUE"
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

module.exports.ObtenerConvenioAnexoDadoId = async function (idConvenioAnexo) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_anexo($1, $2, $3, $4, $5, $6, $7,$8)'
  var listaParametros = ['UNO', idConvenioAnexo, null, null, null, null, null, null]
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

module.exports.CrearConvenioAnexo = async function (objConvenioAnexo) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_anexo($1, $2, $3, $4, $5, $6,$7,$8)'
  var listaParametros = ['IN', null, objConvenioAnexo.conv_anexo_idconvenio, objConvenioAnexo.conv_anexo_strconvenioanexo, objConvenioAnexo.conv_anexo_strdescripcionanexo, objConvenioAnexo.conv_anexo_strruta, null, null]
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

module.exports.ActualizarConvenioAnexo = async function (objConvenioAnexo) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_anexo($1, $2, $3, $4, $5, $6,$7,$8)'
  var listaParametros = ['UP', objConvenioAnexo.idconvenioanexo, null, objConvenioAnexo.conv_anexo_strconvenioanexo, objConvenioAnexo.conv_anexo_strdescripcionanexo, objConvenioAnexo.conv_anexo_strruta, null, null]
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

module.exports.ActualizarConvenioAnexoEstado = async function (idConvenioAnexo, conv_anexo_blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_convenio_anexo($1, $2, $3, $4, $5, $6,$7, $8)'
  var listaParametros = ['UPE', idConvenioAnexo, null, null, null, null, conv_anexo_blestado, null]
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
  
//Revisar 
module.exports.ObtenerContratoDadoIdempresa = async function (idFundacion) {
  var sentencia;
  sentencia = 'SELECT * FROM contrato.f_central_tb_contrato_empresa($1, $2, $3, $4, $5 ,$6 ,$7, $8)'
  var listaParametros = ['UNO', null, idFundacion, null, null, null, null, null]
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
