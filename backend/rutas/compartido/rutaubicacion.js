const express = require('express');
const router = express.Router();
const Request = require("request");
const modeloubicacion=require('../../modelo/compartido/ubicacion');

router.get('/ListadoUbicaciones/:op/:idPadre?', async (req, res) => {
    const op = req.params.op;
    let idPadre = req.params.idPadre;

    // Validar si idPadre es "null" o está vacío, y convertirlo a null
    if (idPadre === "null" || !idPadre) {
        idPadre = null;
    } else {
        idPadre = parseInt(idPadre); // Convertir a entero si tiene un valor válido
    }

    try {
        // Llamar al modelo con el valor correcto de idPadre
        const listado = await modeloubicacion.ListarUbicacion(op, idPadre);
        if (listado.data.length > 0 ) {
            return res.json({
                success: true,
                datos: listado.data,
            });
        } else {
            return res.json({
                success: false,
                datos: [],
            });
        }
    } catch (err) {
        console.error('Error en la ruta ListadoUbicaciones:', err);
        return res.json({
            success: false,
            datos: [],
        });
    }
});

router.get('/DetalleUbicacion/:idPadre?', async (req, res) => {
    let idPadre = req.params.idPadre;
    idPadre = parseInt(idPadre); // Convertir a entero si tiene un valor válido
    try {
        // Llamar al modelo con el valor correcto de idPadre
        const listado = await modeloubicacion.DetalleUbicacion(idPadre);
        if (listado.data.length > 0 ) {
            return res.json({
                success: true,
                datos: listado.data,
            });
        } else {
            return res.json({
                success: false,
                datos: [],
            });
        }
    } catch (err) {
        console.error('Error en la ruta Funcion General - Detalle Ubicacion:', err);
        return res.json({
            success: false,
            datos: [],
        });
    }
});     

module.exports = router;