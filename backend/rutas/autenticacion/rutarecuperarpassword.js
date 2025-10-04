const express = require('express');
const router = express.Router();
const recuperarPassword = require('../../modelo/autenticacion/recuperarpassword');

router.post('/recuperarPassword', async (req, res) => {
    try {
        const { receptor } = req.body;
        const resultado = await recuperarPassword.RecuperarPassword(receptor);

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
