const express = require('express');
const router = express.Router();
const Request = require("request");
const modelodatosorganizacion = require('../modelo/datosorganizacion');
const procesopersonapersonal = require('../procesos/central');


router.get('/ListadoDatosOrganizacion/', async (req, res) => {

    try {

        var listado = await modelodatosorganizacion.ListadoDatosOrganizacion();
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
router.get('/ObtenerDatosOrganizacionDadoId/:idDatosOrganizacion/', async (req, res) => {
    const idDatosOrganizacion = req.params.idDatosOrganizacion;
    try {

        var listado = await modelodatosorganizacion.ObtenerDatosOrganizacionDadoId(idDatosOrganizacion);
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

router.post('/CrearDatosOrganizacion', async (req, res) => {
    const objDatos = req.body.objDatos;
    try {

        var ingresoDatos = await modelodatosorganizacion.CrearDatosOrganizacion(objDatos);

        if (ingresoDatos.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoDatos.data
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

router.post('/ActualizarDatosOrganizacion', async (req, res) => {
    const objDatos = req.body.objDatos;
    try {

        var ingresoDatos = await modelodatosorganizacion.ActualizarDatosOrganizacion(objDatos);

        if (ingresoDatos.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoDatos.data
            });
        } else {
            return res.json({
                success: false,
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


router.get('/ActualizarDatosOrganizacionEstado/:idDatosOrganizacion/:DatosOrganizacions_blestado/', async (req, res) => {
    const idDatosOrganizacion = req.params.idDatosOrganizacion;
    const DatosOrganizacions_blestado = req.params.DatosOrganizacions_blestado;
    try {

        var listado = await modelodatosorganizacion.ActualizarDatosOrganizacionEstado(idDatosOrganizacion, DatosOrganizacions_blestado);
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

router.get('/ListadoPersonalDadoIdCargoActivos/:idCargo', async (req, res) => {

    let idCargo = req.params.idCargo; 

    idCargo = idCargo === 'null' ? null : parseInt(idCargo, 10);

    // Validar la conversión
    if (idCargo !== null && isNaN(idCargo)) {
        return res.status(400).json({
            success: false,
            mensaje: "El ID del estado de donación es inválido"
        });
    }

    // Validar la conversión
    if (idCargo !== null && isNaN(idCargo)) {
        return res.status(400).json({
            success: false,
            mensaje: "El ID del estado de donación es inválido"
        });
    }


    try {

        var listado = await modelodatosorganizacion.ListadoPersonalDadoIdCargoActivos(idCargo);
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
router.get('/ListadoPersonal/', async (req, res) => {

    try {

        var listado = await modelodatosorganizacion.ListadoPersonal();
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

router.get('/BuscarPersonalIdPersona/:idPersona', async (req, res) => {

    try {
        const idPersona = req.params.idPersona;
        var listado = await modelodatosorganizacion.BuscarPersonalIdPersona(idPersona);
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

router.post('/InsertarPersonal/', async (req, res) => {
    const objPersonal = req.body.objPersonal;

    try {
        var listado = await procesopersonapersonal.IngresarPersonaPersonal(objPersonal);

        if (!listado.success || !listado.datos || !listado.datos.idPersonal) {
            return res.json({ success: false, mensaje: "Error al insertar el personal.", datos: [] });
        }

        return res.json({ success: true, datos: listado.datos });

    } catch (err) {

        return res.json({ success: false, mensaje: `Fallo en el servidor: ${err.message}`, datos: [] });
    }
});

router.put('/ActualizarPersonal/', async (req, res) => {
    const objPersonal = req.body.objPersonal;
    try {

        var listado = await procesopersonapersonal.ActualizarPersonaPersonal(objPersonal);
        if (listado.success && listado.data && listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: false,
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

router.put('/ActualizarEstadoPersonal/:idPersonal/:blEstado', async (req, res) => {
    const idPersonal = req.params.idPersonal;
    const blEstado = req.params.blEstado;
    try {

        var listado = await modelodatosorganizacion.ActualizarEstadoPersonalBar(idPersonal, blEstado);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: false,
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

module.exports = router;