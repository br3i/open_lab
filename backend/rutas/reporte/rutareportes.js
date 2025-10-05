const express = require('express');
const router = express.Router();
const Request = require("request");
const modelotermino = require('../../modelo/terminos');
const reportesprocesos = require('./reportesprocesos');
const modeloreporte = require('../../modelo/reporte');


router.post('/pdfSolicitudVoluntarioss', async function (req, res) {
    try {
        const objVoluntario = req.body.objVoluntario;
        var pdfSolicitud = await reportesprocesos.PdfSolicitudVoluntario(objVoluntario);
        if (pdfSolicitud != "") {
            return res.json({
                success: true,
                ingreso: true,
                mensaje: "pdf base 64generado",
                datos: pdfSolicitud
            });
        } else {
            return res.json({
                success: true,
                ingreso: true,
                mensaje: "pdf base 64 vacio",
                datos: ""
            });
        }


    } catch (err) {
        console.log('Error: ' + err)
    }
});

router.get('/pdfTerminosCondiciones/:idPersona', async (req, res) => {
    const idPersona = req.params.idPersona;
    try {
        var datosTerminos = await modelotermino.ObtenerTerminoVigente(1);
        var datosAceptacion = await modelotermino.EncontrarAceptacionTermino(datosTerminos.data[0].idterminos, idPersona);

        if (datosAceptacion.count > 0) {
            var pdfSolicitud = await reportesprocesos.PdfTerminosAceptacion(datosTerminos.data[0], datosAceptacion.data[0]);
            if (pdfSolicitud != "") {
                return res.json({
                    success: true,
                    ingreso: true,
                    mensaje: "pdf base 64generado",
                    datos: pdfSolicitud
                });
            } else {
                return res.json({
                    success: true,
                    ingreso: true,
                    mensaje: "pdf base 64 vacio",
                    datos: ""
                });
            }
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

router.get('/pdfCartaAceptacion/:idPersona/:strCedula', async (req, res) => {
    const idPersona = req.params.idPersona;
    const strCedula = req.params.strCedula;
    try {
        var datosTerminos = await modelotermino.ObtenerTerminoVigente(2);
        var datosAceptacion = await modelotermino.EncontrarAceptacionTermino(datosTerminos.data[0].idterminos, idPersona);
        if (datosAceptacion.count > 0) {
            var pdfSolicitud = await reportesprocesos.PdfCartaCompromiso(datosTerminos.data[0], datosAceptacion.data[0], idPersona, strCedula);
            if (pdfSolicitud != "") {
                return res.json({
                    success: true,
                    ingreso: true,
                    mensaje: "pdf base 64generado",
                    datos: pdfSolicitud
                });
            } else {
                return res.json({
                    success: true,
                    ingreso: true,
                    mensaje: "pdf base 64 vacio",
                    datos: ""
                });
            }
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

// Endpoint para datos de dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const resultado = await modeloreporte.DashboardTotales();
        return res.json({ success: true, datos: resultado.data });
    } catch (err) {
        console.error('Error endpoint /dashboard:', err);
        return res.status(500).json({ success: false, mensaje: err.message });
    }
});