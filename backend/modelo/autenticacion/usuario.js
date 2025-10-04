const { Pool } = require('pg');
const { execCentralizada, execCentralizadaProcedimientos,execTransaccion } = require('../../config/execSQLCentralizada.helper');
const bcrypt = require('bcrypt');



module.exports.ListadoUsuarioTodos = async function () {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5, $6, $7, $8 )';
  const listaParametros = ['TODO', null, null, null, null, null, null,null];

  try {
    if (sentencia) {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return resp;
    } else {
      return { data: "vacio sql" };
    }
  } catch (error) {
    return { data: "Error: " + error };
  }
};


module.exports.ListadoUsuarioPersonaTodos = async function () {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5, $6, $7, $8 )';
  const listaParametros = ['TODP', null, null, null, null, null, null,null];

  try {
    if (sentencia) {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return resp;
    } else {
      return { data: "vacio sql" };
    }
  } catch (error) {
    return { data: "Error: " + error };
  }
};
module.exports.listadoUsuarioActivos = async function () {
  const sentencia = "SELECT * FROM seguridad.tb_usuario WHERE estado = TRUE";

  try {
    if (sentencia) {
      const resp = await execCentralizada(sentencia, "OK", "OK");
      return resp;
    } else {
      return { data: "vacio sql" };
    }
  } catch (error) {
    return { data: "Error: " + error };
  }
};

module.exports.CrearUsuario = async function (client, objUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5, $6, $7, $8)';
  
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(objUsuario.usuario_strclave, saltRounds);

    const listaParametros = ['IN', null, objUsuario.usuario_strnombre, hashedPassword, null, null, objUsuario.usuario_idpersona,null];

    const resp = await execTransaccion(client, sentencia, listaParametros, "OK", "OK");
    return resp;
  } catch (error) {
    return { data: "Error: " + error };
  }
};

module.exports.ActualizarUsuario = async function (objUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5, $6, $7, $8)';
  
  try {
    let hashedPassword = null;

    // **Solo hashear la contraseña si se envía desde el front**
    if (objUsuario.usuario_strclave) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(objUsuario.usuario_strclave, saltRounds);
    }

    // **Enviar la contraseña solo si fue proporcionada, sino enviar null**
    const listaParametros = [
      'UP',
      objUsuario.idusuario,
      objUsuario.usuario_strnombre,
      hashedPassword, // Esto será 'null' si no se envió una contraseña
      null,
      null,
      objUsuario.usuario_idpersona,
      null
    ];

    // Ejecutar la sentencia
    const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
    return resp;
  } catch (error) {
    return { data: "Error: " + error };
  }
};


module.exports.ActualizarUsuarioEstado = async function (idUsuario, blestado) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5 ,$6, $7, $8)';
  const listaParametros = ['UPE', idUsuario, null, null, blestado, null, null,null];
  try {
    const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
    return resp;
  } catch (error) {
    return { data: "Error: " + error };
  } 
};

module.exports.ObtenerUsuarioDadoId = async function (idUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5 ,$6, $7, $8)';
  const listaParametros = ['UNO', idUsuario, null, null, null, null, null,null];
  try {
    if (sentencia) {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return resp;
    } else {
      return { data: "vacio sql" };
    }
  } catch (error) {
    return { data: "Error: " + error };
  }
};
module.exports.ObtenerUsuarioDadoNombreUsuario = async function (nombreUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5 ,$6, $7, $8)';
  const listaParametros = ['EDU', null, nombreUsuario, null, null, null, null,null];
  try {
    if (sentencia) {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return resp;
    } else {
      return { data: "vacio sql" };
    }
  } catch (error) {
    return { data: "Error: " + error };
  }
};

module.exports.ObtenerUsuarioDadoCorreoUsuario = async function (correoUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5 ,$6, $7,$8)';
  const listaParametros = ['EDE', null, null, null, null, null, null, correoUsuario];
  try {
    if (sentencia) {
      const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
      return resp;
    } else {
      return { data: "vacio sql" };
    }
  } catch (error) {
    return { data: "Error: " + error };
  }
};

module.exports.EliminarRegistroUsuario = async function (idUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5 ,$6, $7, $8)';
  const listaParametros = ['DEL', idUsuario, null, null, null, null, null,null];
  try {
    const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
    return resp;
  } catch (error) {
    return { data: "Error: " + error };
  }
};

module.exports.ObtenerRolesDadoId = async function (idUsuario) {
  const sentencia = 'SELECT * FROM seguridad.f_central_obtener_roles_usuario($1)';
  const listaParametros = [idUsuario];
  try {
    const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");
    return { data: resp?.data ?? [] };
  } catch (error) {
    return { data: "Error: " + error };
  }
};
