
const express = require('express');
const router = express.Router();
const Request = require("request");
const fs = require("fs");
const modelocentral = require('../../modelo/persona/central');
const procesocentral = require('../../procesos/central');



router.get('/ListadoDocumentos/', async (req, res) => {

    try {

        var listado = await modelocentral.ListadoDocumentos();
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

router.get('/ListadoSexo/', async (req, res) => {

    try {

        var listado = await modelocentral.ListadoSexo();
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

router.get('/ListadoEtniaActivas/', async (req, res) => {

    try {

        var listado = await modelocentral.ListadoEtnia();
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
router.get('/ListadoEstadoCivilActivos/', async (req, res) => {

    try {

        var listado = await modelocentral.istarEstadoCivil();
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
router.get('/ObtenerPersonaCedula/:cedula', async (req, res) => {
    const cedula = req.params.cedula;

    try {

        var listado = await modelocentral.EncontrarPersonaDadoCedula(cedula);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                message: "Cédula registrada",
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                message: "Cédula no registrada",
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
router.get('/ObtenerPersonaId/:idpersona', async (req, res) => {
    const idpersona = req.params.idpersona;
    try {

        var listado = await modelocentral.EncontrarPersonaDadoId(idpersona);
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
router.get('/ObtenerPersonaFoto/:idpersona', async (req, res) => {
    const idpersona = req.params.idpersona;
    try {

        var listado = await modelocentral.ObtenerFotoDadoId(idpersona);
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

// Ruta para el ingreso de una persona
router.post('/IngresarPersona', async function (req, res) {

    const objPersona = req.body.objPersona;
    let client = null;
    try {

        const personaExistente = await modelocentral.EncontrarPersonaDadoCedula(objPersona.documento);

        if (personaExistente && personaExistente.count > 0) {
            return res.status(400).json({
                success: false,
                mensaje: "Este documento ya está registrado",
                datos: personaExistente
            });
        }

        // Llama al proceso transaccional para guardar persona y foto
        const resultado = await modelocentral.IngresarPersona(client, objPersona);

        // Verificar si la respuesta contiene datos
        if (resultado.data.length > 0) {
            return res.json({
                success: true,
                datos: resultado.data
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

router.post('/IngresarPersonaFoto', async function (req, res) {
    try {
        const objPersona = req.body.objPersona;

        // Verifica si la persona ya existe
        const personaExistente = await modelocentral.EncontrarPersonaDadoCedula(objPersona.documento);

        if (personaExistente && personaExistente.count > 0) {
            return res.status(400).json({
                success: false,
                mensaje: "Este documento ya está registrado",
                datos: personaExistente
            });
        }

        // Llama al proceso transaccional para guardar persona y foto
        const resultado = await procesocentral.guardarPersonaConFoto(objPersona);
        if (resultado.success) {
            return res.status(201).json({
                success: true,
                mensaje: "Registro exitoso de la persona",
                datos: resultado
            });
        } else {
            return res.status(500).json({
                success: false,
                mensaje: "Error en el registro de la persona y su foto",
                error: resultado.error
            });
        }
    } catch (err) {
        console.error("Error en la ruta /IngresarPersonaFoto:", err);
        return res.status(500).json({
            success: false,
            mensaje: "Error interno del servidor",
            error: err.message
        });
    }
});

router.put('/ActualizarPersona/', async (req, res) => {
    const objPersona = req.body.objPersona;
    let client = null;
    try {
        var listado = await modelocentral.ActualizarPersona(client, objPersona);
        if (listado.success && listado.data && listado.data.length > 0) {
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

module.exports = router;