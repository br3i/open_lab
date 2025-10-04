const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos, execTransaccion } = require('../../config/execSQLCentralizada.helper');



module.exports.ListadoDocumentos = async function () {
  var sentencia;
  sentencia = "select * from central.tb_tipo_documento"
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

module.exports.ListadoEtnia = async function () {
  var sentencia;
  sentencia = "select * from central.tb_etnia where estado=true"
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

module.exports.EncontrarPersonaDadoCedula = async function (cedula) {
  var sentencia;
  sentencia = "SELECT p.idpersona AS idpersona, pd.documento as documento, p.nombres as nombres,p.apellidos as apellidos,p.correo1 as correo1,p.correo2 as correo2,p.celular1 as celular1, p.celular2 as celular2 , p.edad as edad, p.sexo as sexo FROM central.tb_persona_documento as pd INNER JOIN central.tb_persona as p on p.idpersona=pd.idpersona INNER JOIN central.tb_etnia as e on e.id=p.idetnia INNER JOIN central.tb_estado_civil as ec on ec.id=p.idestadocivil INNER JOIN central.tb_tipo_documento as tp on tp.iddocumento=pd.idtipodocumento WHERE pd.documento='" + cedula + "' and pd.estado=true"
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

module.exports.EncontrarPersonaDadoId = async function (idPersona) {
  var sentencia;
  sentencia = "SELECT * FROM central.tb_persona_documento as pd INNER JOIN central.tb_persona as p on p.idpersona=pd.idpersona INNER JOIN central.tb_etnia as e on e.id=p.idetnia INNER JOIN central.tb_estado_civil as ec on ec.id=p.idestadocivil INNER JOIN central.tb_tipo_documento as tp on tp.iddocumento=pd.idtipodocumento WHERE pd.idpersona=" + Number(idPersona) + " and pd.estado=true"
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

// Inserta una persona en la base de datos
module.exports.IngresarPersona = async function (client, objPersona) {
  const sentencia =
    'SELECT * FROM central.f_central_persona($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)';
  const listaParametros = [
    'IN',
    null,
    objPersona.documento,
    objPersona.nombres,
    objPersona.apellidos,
    objPersona.correo1,
    objPersona.correo2,
    objPersona.celular1,
    objPersona.celular2,
    objPersona.direccion,
    objPersona.edad,
    objPersona.sexo,
    objPersona.idestadocivil,
    objPersona.idetnia,
    null,
    null,
    objPersona.tipodocumento,
    objPersona.strtiponombre,
  ];

  try {
    if (client) {
      // Si se pasa un cliente, usar una transacción con ese cliente
      return await execTransaccion(client, sentencia, listaParametros, "Persona Registrada", "No se pudo registar persona");
    }
    if (!client && sentencia != "") {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return (resp)
    }
  } catch (error) {
    await rollbackTransaccion(client);
    console.error("Error en la transacción:", error.message || error);

    return {
      success: false,
      mensaje: `Error en la transacción: ${error.message || "Error desconocido"}`
    };
  }
};

// Inserta una foto para una persona en la base de datos
module.exports.InsertarPersonaFoto = async function (client, idPersona, strFoto) {
  const sentencia = "INSERT INTO central.tb_persona_foto (idpersona, strfoto) VALUES ($1, $2)";
  const parametros = [idPersona, strFoto];

  try {
    return await execTransaccion(client, sentencia, parametros, "Foto insertada", "No se pudo insertar la foto");
  } catch (error) {
    await rollbackTransaccion(client);
    console.error("Error en la transacción:", error.message || error);

    return {
      success: false,
      mensaje: `Error en la transacción: ${error.message || "Error desconocido"}`
    };
  }

};


module.exports.ActualizarPersona = async function (client, objPersona) {
  const sentencia = 'SELECT * FROM central.f_central_persona($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)';
  const listaParametros = [
    'UP',
    objPersona.idpersona,
    null,
    objPersona.nombres || null,  // Si no envías un campo, pasa null
    objPersona.apellidos || null,
    objPersona.correo1 || null,
    objPersona.correo2 || null,
    objPersona.celular1 || null,
    objPersona.celular2 || null,
    objPersona.direccion || null,
    objPersona.edad || null,
    objPersona.sexo || null,
    objPersona.idestadocivil || null,
    objPersona.idetnia || null,
    null,
    null,
    objPersona.tipodocumento || null,
    objPersona.strtiponombre || null
  ];

   try {
    if (client) {
    return await execTransaccion(client, sentencia, listaParametros, "Datos Actualizados de Persona ", "No se pudo actualizar los datos de persona");
    }
    if (!client && sentencia != "") {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return (resp)
    }
  } catch (error) {
        await rollbackTransaccion(client);

     return {
      success: false,
      mensaje: `Error en la transacción: ${error.message || "Error desconocido"}`
    };
  }

};

module.exports.ObtenerFotoDadoId = async function (idPersona) {
  var sentencia;
  sentencia = "select * from central.tb_persona_foto where idpersona=" + idPersona + ""
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

module.exports.ListadoSexo = async function () {
  var sentencia;
  sentencia = "Select idsexo, strnombre  from central.tb_sexo where blestado = true "
  
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