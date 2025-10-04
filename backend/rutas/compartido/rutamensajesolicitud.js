const express = require('express');
const router = express.Router();
const procesoguardarsolicitudmensaje = require('../../procesos/empresa');

router.post('/mensajeSolicitud', async (req, res) => {
    try {

        const objSolicitud = req.body;
        const resultado = await procesoguardarsolicitudmensaje.GuardarSolicitudMensaje(objSolicitud);
        
        if (resultado.success) {
            res.json(resultado); // Retorna el mensaje y el código al frontend
        } else {
            res.status(500).json(resultado);
        }
    } catch (error) {
        res.status(500).json({ success: false, mensaje: 'Error interno del servidor.' });
    }
});


module.exports = router;
