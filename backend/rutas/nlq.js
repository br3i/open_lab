const express = require('express');
const router = express.Router();
const { procesarConsultaNLQ } = require('../procesos/nlq');

// Definimos el endpoint POST /api/nlq/consulta
router.post('/consulta', async (req, res) => {
    // Obtenemos la pregunta del cuerpo de la petición
    const { pregunta } = req.body;

    if (!pregunta) {
        return res.status(400).json({
            success: false,
            mensaje: "No se proporcionó ninguna pregunta."
        });
    }

    try {
        const resultado = await procesarConsultaNLQ(pregunta);
        res.json({
            success: true,
            data: resultado
        });
    } catch (error) {
        console.error("Error al procesar la consulta NLQ:", error);
        res.status(500).json({
            success: false,
            mensaje: "Ocurrió un error en el servidor."
        });
    }
});

module.exports = router;
