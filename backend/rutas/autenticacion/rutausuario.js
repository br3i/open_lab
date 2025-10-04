const express = require('express');
const router = express.Router();
const Request = require("request");
const modelousuario=require('../../modelo/autenticacion/usuario');
const procesousuarioperfil = require('../../procesos/usuarioperfil');
router.get('/ListadoUsuarioTodos/', async (req, res) => {

    try {

        var listado = await modelousuario.ListadoUsuarioTodos();
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});

router.get('/ListadoUsuarioPersonaTodos/', async (req, res) => {

    try {

        var listado = await modelousuario.ListadoUsuarioPersonaTodos();
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});

router.post('/CrearUsuario', async (req, res) => {

    const objUsuario = req.body.objUsuario;
  
    try {
      var ingresoUsuario = await procesousuarioperfil.guardarPersonaPerfil(objUsuario);
  
      // Verificar si la respuesta contiene datos
      if (ingresoUsuario.success && ingresoUsuario.data && ingresoUsuario.data.length > 0) {
        return res.json({
          success: true,
          datos: ingresoUsuario.data
        });
      } else {
        return res.json({
          success: true,
          datos: [],
          mensaje: ingresoUsuario.mensaje || "No se insertaron perfiles"
        });
      }
    } catch (err) {
      return res.json({
        success: false,
        datos: [],
        error: err.message
      });
    }
  });
  

router.put('/ActualizarUsuario', async (req, res) => {
    
    const objUsuario = req.body.objUsuario;
    try {

        var actualizarUsuario = await modelousuario.ActualizarUsuario(objUsuario);
        if (actualizarUsuario.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarUsuario.data
            });
        }
        else {
            return res.json({
                success: true,
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});

router.put('/ActualizarUsuarioEstado/:idUsuario/:blEstado', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    const blEstado = req.params.blEstado;
    try {

        var listado = await modelousuario.ActualizarUsuarioEstado(idUsuario, blEstado);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});

router.get('/ObtenerUsuarioDadoId/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    try {

        var listado = await modelousuario.ObtenerUsuarioDadoId(idUsuario);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el Usuario",
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});

router.get('/ObtenerUsuarioDadoNombreUsuario/:nombreUsuario', async (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    try {

        var listado = await modelousuario.ObtenerUsuarioDadoNombreUsuario(nombreUsuario);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el Usuario",
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});
router.get('/ObtenerUsuarioDadoCorreoUsuario/:correoUsuario', async (req, res) => {
    const correoUsuario = req.params.correoUsuario;
    try {

        var listado = await modelousuario.ObtenerUsuarioDadoCorreoUsuario(correoUsuario);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el correo asociado",
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});
router.delete('/EliminarRegistroUsuario/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    try {

        var listado = await modelousuario.EliminarRegistroUsuario(idUsuario);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "Usuario Borrado",
                datos: []
            });
        }

    } catch (err) {
        
        return res.json(
            {
                success: false,
                datos: []
            }
        );
    }
});

router.get('/RolesUsuario/:idUsuario', async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;

        // Llamar al modelo para obtener los roles
        const listadoRoles = await modelousuario.ObtenerRolesDadoId(idUsuario);

        // Verificar que listadoRoles.data es un array antes de usar .length
        if (Array.isArray(listadoRoles.data) && listadoRoles.data.length > 0) {
            return res.json({
                success: true,
                roles: listadoRoles.data
            });
        } else {
            return res.json({
                success: false,
                roles: [] // Enviar array vacío si no hay roles
            });
        }

    } catch (err) {
        
        return res.json({
            success: false,
            roles: [],
            mensaje: "Error al obtener los roles"
        });
    }
});

module.exports = router;


