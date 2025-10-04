const express = require('express');
const router = express.Router();
const Request = require("request");
const modelodonantepersona = require('../../modelo/persona/donantepersona');


//Usa para listar las solicitudes de las personas por estado 
router.get('/ListadoSolicitudDonante/:idTipoSolicitud/:solicitud_blestado', async (req, res) => {

    const idTipoSolicitud = req.params.idTipoSolicitud;
    let solicitud_blestado = req.params.solicitud_blestado;

    // Validar si idPadre es "null" o está vacío, y convertirlo a null
    if (solicitud_blestado === "null" || !solicitud_blestado) {
        solicitud_blestado = null;
    }

    try {

        var listado = await modelodonantepersona.ListadoSolicitudDonante(idTipoSolicitud, solicitud_blestado);
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


router.get('/ObtenerSolicitudPersonaActivo/:idtiposolicitud/:idPersona', async (req, res) => {

    const idPersona = req.params.idPersona;
    const idtiposolicitud = req.params.idtiposolicitud;
    try {
        var listado = await modelodonantepersona.ObtenerSolicitudPersonaActivo(idtiposolicitud,idPersona);
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

module.exports = router;