const { iniciarTransaccion, commitTransaccion, rollbackTransaccion } = require('./transacciones');
const modelousuario = require("./../modelo/autenticacion/usuario");
const modeloperfil = require("./../modelo/autenticacion/perfil");


module.exports.guardarPersonaPerfil = async function (objUsuario) {
    const client = await iniciarTransaccion();
  
    try {
      // Inserta la persona usando el modelo
      const usuarioResp = await modelousuario.CrearUsuario(client, objUsuario);
  
      if (!usuarioResp || usuarioResp.count === 0) {
        throw new Error("Error al insertar la persona");
      }
        //throw new Error("Error intencional para probar el rollback");
      // Obtener el id del usuario recién insertado
      const nuevoIdUsuario = usuarioResp.data[0].ouidusuario;
        // Inserta los perfiles usando el nuevo id de usuario
      for (const perfil of objUsuario.objPerfil) {
        const objPerfil = { idusuario: nuevoIdUsuario, idrol: perfil.idrol };
  
        const perfilResp = await modeloperfil.CrearPerfil(client, objPerfil);
  
        if (!perfilResp || perfilResp.count === 0) {
          throw new Error("Error al insertar el perfil");
        }
      }
  
      // Confirma la transacción
      await commitTransaccion(client);
  
      return {
        success: true,
        data: usuarioResp.data,
        mensaje: "Usuario y perfiles insertados correctamente",
      };
    } catch (error) {
      await rollbackTransaccion(client);
      console.error("Error en la transacción:", error);
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }
  };
  
  
  
