
const sql = require('pg')
var os = require('os');
const { Client } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos, execTransaccion } = require('../config/execSQLCentralizada.helper');


module.exports.ListadoDatosOrganizacion = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_datos_organizacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)'
  var listaParametros = ['TODO', null, null, null, null, null, null, null, null, null]
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

module.exports.ListadoDatosOrganizacionActivos = async function () {
  var sentencia;
  sentencia = "SELECT * FROM convenio.tb_datos_organizacion WHERE organizacion_blestado=TRUE"
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

module.exports.ObtenerDatosOrganizacionDadoId = async function (idDatosOrganizacion) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_datos_organizacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)'
  var listaParametros = ['UNO', idDatosOrganizacion, null, null, null, null, null, null, null, null]
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

module.exports.CrearDatosOrganizacion = async function (objDatos) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_datos_organizacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)'
  var listaParametros = ['IN', null, objDatos.organizacion_strnombre, objDatos.organizacion_strciudad, objDatos.organizacion_strdireccion,
    objDatos.organizacion_strtelefono, objDatos.organizacion_strcorreo,
    objDatos.organizacion_strdireccion_web, null, null]
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

module.exports.ActualizarDatosOrganizacion = async function (objDatos) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_datos_organizacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)'
  var listaParametros = ['UP', objDatos.iddatosorganizacion, objDatos.organizacion_strnombre, objDatos.organizacion_strciudad, objDatos.organizacion_strdireccion,
    objDatos.organizacion_strtelefono, objDatos.organizacion_strcorreo,
    objDatos.organizacion_strdireccion_web, null, null]
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

module.exports.ActualizarDatosOrganizacionEstado = async function (idDatosOrganizacion, DatosOrganizacions_blestado) {
  var sentencia;
  sentencia = 'SELECT * FROM convenio.f_central_tb_datos_organizacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)'
  var listaParametros = ['UPE', idDatosOrganizacion, null, null, null, null, null, null, DatosOrganizacions_blestado, null]
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

//Listado de personal activos en el BAR segun los cargos
module.exports.ListadoPersonalDadoIdCargoActivos = async function (idCargo) {
  var sentencia;
  sentencia = 'SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5 ,$6,$7,$8)'
  var listaParametros = ['LSET', null, null, idCargo, null, null, true, null]
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

module.exports.ListadoPersonal = async function () {
  var sentencia;
  sentencia = 'SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5 ,$6,$7,$8)'
  var listaParametros = ['LST', null, null, null, null, null, null, null]
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

module.exports.BuscarPersonalIdPersona = async function (idPersona) {
  var sentencia;
  sentencia = 'SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5 ,$6,$7,$8)'
  var listaParametros = ['BIP', null, idPersona, null, null, null, null, null]
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

module.exports.BuscarPersonalIdPersonal= async function (idPersonal) {
  var sentencia;
  sentencia = 'SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5 ,$6,$7,$8)'
  var listaParametros = ['UNO', idPersonal, null, null, null, null, null, null]
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

module.exports.InsertarPersonalBar = async function (client, objPersonal) {
  const sentencia = `
    SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const parametros = ['IN', null, objPersonal.idpersona, objPersonal.idcargo, objPersonal.strdescripcion1, objPersonal.strdescripcion2, null, null ];

  try {
    return await execTransaccion(
      client,
      sentencia,
      parametros,
      'Personal ingresado',
      'No se pudo ingresar el personal'
    );
  } catch (error) {
    console.error('Error al ingresar personal:', error);
    throw error;
  }
};

module.exports.ActualizarPersonalBar = async function (objPersonal) {
  const sentencia = 'SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
  const listaParametros = [
    'UP',
    objPersonal.idPersonal,
    objPersonal.idPersona || null,
    objPersonal.idCargo || null,
    objPersonal.strDescripcion1 || null,
    objPersonal.strDescripcion2 || null,
    null,
    null,
    null,
    null,
  ];

  try {
    return await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    throw error;
  }
};

module.exports.ActualizarEstadoPersonalBar = async function (idPersonal, blEstado) {
  var sentencia;
  sentencia = 'SELECT * FROM public.f_central_organizacion_personal($1, $2, $3, $4, $5 ,$6,$7,$8)'
  var listaParametros = ['UPE', idPersonal, null, null, null, null, blEstado

  ]
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



