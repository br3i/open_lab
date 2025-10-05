const express = require('express');
const router = express.Router();
const Request = require("request");
const modeloempresa = require('../../modelo/empresa/empresa');
const procesoempresa = require('../../procesos/empresa');

//Usa para listar las solicitudes de las empresas por estado 
router.get('/ListadoEmpresa/:idTipoSolicitud/:idTipoEntidad', async (req, res) => {
    const idTipoSolicitud = req.params.idTipoSolicitud;
    const idTipoEntidad = req.params.idTipoEntidad;
    try {

        var listado = await modeloempresa.ListadoEmpresa(idTipoSolicitud, idTipoEntidad);
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

//Ruta para istado las empresas/fundaciones que tiene solicitudes aceptadas y en estado activo
router.get('/ListadoEmpresasAceptadasActivas/:idTipoSolicitud/:idTipoEntidad', async (req, res) => {
    const idTipoSolicitud = req.params.idTipoSolicitud;
    const idTipoEntidad = req.params.idTipoEntidad;
    try {

        var listado = await modeloempresa.ListadoEmpresasAceptadasActivas(idTipoSolicitud, idTipoEntidad);
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

router.get('/ListadoCargoEmpresaActivos/', async (req, res) => {

    try {

        var listado = await modeloempresa.ListadoCargoEmpresaActivos();
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

router.get('/ObtenerEmpresaRucSolicitudActivo/:strRuc/:idTipoEntidad/:idTipoSolicitud', async (req, res) => {
    const strRuc = req.params.strRuc;
    const idTipoEntidad = req.params.idTipoEntidad;
    const idTipoSolicitud = req.params.idTipoSolicitud;

    try {

        var listado = await modeloempresa.ObtenerEmpresaRucSolicitudActivo(strRuc, idTipoEntidad, idTipoSolicitud);

        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe una solicitud con esta empresa",
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

router.get('/ObtenerEmpresaDadoRuc/:strRuc', async (req, res) => {
    const strRuc = req.params.strRuc;
    try {

        var listado = await modeloempresa.EncontrarEmpresaRuc(strRuc);
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

router.get('/ObtenerEmpresaDadoId/:idfundacion', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    try {

        var listado = await modeloempresa.ObtenerEmpresaId(idfundacion);
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

router.get('/ObtenerAnexoDadoIdEmpresa/:idfundacion', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    try {

        var listado = await modeloempresa.ObtenerAnexoDadoIdEmpresa(idfundacion);
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

router.get('/ListadoSucursalEmpresa/:idfundacion', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    try {

        var listado = await modeloempresa.ListadoSucursalEmpresa(idfundacion);
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

router.get('/ListadoSucursalEmpresaActivos/:idfundacion', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    try {

        var listado = await modeloempresa.ListadoSucursalActivos(idfundacion);
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

router.get('/ObtenerRepresentanteId/:idrepresentante/:idfundacion/:idcargo', async (req, res) => {
    const idRepresentate = req.params.idrepresentante;
    const idFundacion = req.params.idfundacion;
    const idCargo = req.params.idcargo;
    try {

        var listado = await modeloempresa.ObtenerRepresentanteId(idRepresentate, idFundacion, idCargo);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe representante con este id",
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

router.get('/ObtenerRepresentanteAnonimo/:idpersona/:idfundacion/:idcargo', async (req, res) => {
    const idPersona = req.params.idpersona;
    const idFundacion = req.params.idfundacion;
    const idCargo = req.params.idcargo;
    try {

        var listado = await modeloempresa.ObtenerRepresentanteIdPersona(idPersona, idFundacion, idCargo);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe representante Anónimo",
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

router.post('/IngresarEmpresaSolicitud', async (req, res) => {
    try {
        const { objPersona, objEmpresa, objEmpresaAnexo, objSolicitud } = req.body;

        // Llama a la función principal
        const resultado = await procesoempresa.IngresarSolicitudEmpresa(objPersona, objEmpresa, objEmpresaAnexo, objSolicitud);

        // Verificar si la respuesta indica un error
        if (!resultado.success) {
            return res.status(400).json({
                success: false,
                mensaje: resultado.mensaje
            });
        }

        // Si todo salió bien
        return res.status(200).json({
            success: true,
            mensaje: resultado.mensaje
        });

    } catch (error) {
        console.error("Error inesperado en la ruta:", error.message || error);
        return res.status(500).json({
            success: false,
            mensaje: `Error inesperado: ${error.message || "Error desconocido"}`
        });
    }
});

router.post('/IngresarPersonalEmpresa', async (req, res) => {
    const objPersona = req.body.objPersona;

    try {

        // Llama a la función principal
        const resultado = await procesoempresa.IngresarPersonalEmpresa(objPersona);

        // Verificar si la respuesta indica un error
        if (!resultado.success) {
            return res.status(400).json({
                success: false,
                mensaje: resultado.mensaje,
            });
        }

        // Si todo salió bien
        return res.status(200).json({
            success: true,
            mensaje: resultado.mensaje,
            datos: resultado.datos
        });

    } catch (error) {
        console.error("Error inesperado en la ruta:", error.message || error);
        return res.status(500).json({
            success: false,
            mensaje: `Error inesperado: ${error.message || "Error desconocido"}`
        });
    }
});

router.get('/IngresarAnonimoEmpresa/:idpersona/:idfundacion/:idcargo', async (req, res) => {
    const idPersona = req.params.idpersona;
    const idFundacion = req.params.idfundacion;
    const idCargo = req.params.idcargo;
    let client = null;

    try {
        const listado = await modeloempresa.RegistrarRepresentante(client, idPersona, idFundacion,idCargo);

        // Validación mejorada
        if (listado.data && listado.data.length > 0) {
            const posibleError = listado.data[0];

            // Verificar si es un error en forma de string
            if (typeof posibleError === 'string' && posibleError.toLowerCase().includes('error')) {
                console.error("Error en procedimiento SQL:", posibleError);
                return res.json({
                    success: false,
                    datos: listado.data
                });
            }

            // Todo salió bien
            return res.json({
                success: true,
                datos: listado.data
            });
        } else {
            // No hay datos o la función no devolvió resultados
            return res.json({
                success: false,
                datos: []
            });
        }

    } catch (err) {
        console.error('Error inesperado en el backend:', err);
        return res.json({
            success: false,
            datos: [],
            mensaje: 'Error inesperado en el servidor'
        });
    }
});

router.post('/IngresarSucursal', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud

    const objSucursal = req.body.objSucursal;
    let client = null;
    try {

        var ingresoItem = await modeloempresa.CrearSucursal(client, objSucursal);

        // Verificar si la respuesta contiene datos
        if (ingresoItem.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoItem.data
            });
        } else {
            return res.json({
                success: true,
                datos: []
            });
        }
    } catch (err) {

        return res.json({
            success: false,
            datos: []
        });
    }
});

router.get('/ActualizarEstadoEmpresa/:idfundacion/:empresa_blestado', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    const empresa_blestado = req.params.empresa_blestado;

    try {
        const listado = await modeloempresa.ActualizarEstadoEmpresa(idfundacion, empresa_blestado);

        // Validación mejorada
        if (listado.data && listado.data.length > 0) {
            const posibleError = listado.data[0];

            // Verificar si es un error en forma de string
            if (typeof posibleError === 'string' && posibleError.toLowerCase().includes('error')) {
                console.error("Error en procedimiento SQL:", posibleError);
                return res.json({
                    success: false,
                    datos: listado.data
                });
            }

            // Todo salió bien
            return res.json({
                success: true,
                datos: listado.data
            });
        } else {
            // No hay datos o la función no devolvió resultados
            return res.json({
                success: false,
                datos: []
            });
        }

    } catch (err) {
        console.error('Error inesperado en el backend:', err);
        return res.json({
            success: false,
            datos: [],
            mensaje: 'Error inesperado en el servidor'
        });
    }
});

router.get('/ActualizarEstadoSolicitudEmpresa/:idSolicitud/:idTipoSolicitud', async (req, res) => {
    const idSolicitud = req.params.idSolicitud;
    const idTipoSolicitud = req.params.idTipoSolicitud;
    try {
        var Informacion = await modeloempresa.ActualizarEstadoSolicitudEmpresa(idSolicitud, idTipoSolicitud);
        if (Informacion.data.length > 0) {

            return res.json({
                success: true,
                datos: Informacion.data
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

router.get('/ListadoRepresentantesEmpresaActivos/:idfundacion', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    try {

        var listado = await modeloempresa.ListadoRepresentantesEmpresaActivos(idfundacion);
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

router.post('/IngresarFundacionSolicitud', async (req, res) => {
    try {
        const { objPersona, objCoordinador, objEmpresa, objEmpresaAnexo, objSolicitud } = req.body;

        // Llama a la función principal
        const resultado = await procesoempresa.IngresarSolicitudFundacion(objPersona, objCoordinador, objEmpresa, objEmpresaAnexo, objSolicitud);

        // Verificar si la respuesta indica un error
        if (!resultado.success) {
            return res.status(400).json({
                success: false,
                mensaje: resultado.mensaje
            });
        }

        // Si todo salió bien
        return res.status(200).json({
            success: true,
            mensaje: resultado.mensaje
        });

    } catch (error) {
        console.error("Error inesperado en la ruta:", error.message || error);
        return res.status(500).json({
            success: false,
            mensaje: `Error inesperado: ${error.message || "Error desconocido"}`
        });
    }
});

router.get('/ActualizarEstadoLogicoSolicitudEmpresa/:idSolicitud/:blEstado', async (req, res) => {
    const idSolicitud = req.params.idSolicitud;
    const blEstado = req.params.blEstado;
    try {
        var Informacion = await modeloempresa.ActualizarEstadoLogicoSolicitudEmpresa(idSolicitud, blEstado);
        if (Informacion.data.length > 0) {

            return res.json({
                success: true,
                datos: Informacion.data
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

router.post('/ActualizarEmpresaRepresentante', async (req, res) => {
    try {
        const { objPersona, objEmpresa, objEmpresaAnexo } = req.body;

        // Llama a la función principal
        const resultado = await procesoempresa.ActualizarEmpresaRepresentante(objPersona, objEmpresa, objEmpresaAnexo);

        // Verificar si la respuesta indica un error
        if (!resultado.success) {
            return res.status(400).json({
                success: false,
                mensaje: resultado.mensaje
            });
        }

        // Si todo salió bien
        return res.status(200).json({
            success: true,
            mensaje: resultado.mensaje
        });

    } catch (error) {
        console.error("Error inesperado en la ruta:", error.message || error);
        return res.status(500).json({
            success: false,
            mensaje: `Error inesperado: ${error.message || "Error desconocido"}`
        });
    }
});


module.exports = router;