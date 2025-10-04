const express = require('express');
const router = express.Router();
const Request = require("request");
const modelotipodonante=require('../../modelo/catalogos/tipodonante');


router.get('/ListadoTipoDonanteActivos/', async (req, res) => {

    try {

        var listado = await modelotipodonante.ListadoTipoDonanteActivos();
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

router.get('/ListadoTipoDonanteTodos/', async (req, res) => {

    try {

        var listado = await modelotipodonante.ListadoTipoDonanteTodos();
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

router.get('/ObtenerTipoDonanteDadoId/:idTipoDonante', async (req, res) => {
    const idTipoDonante = req.params.idTipoDonante;
    try {

        var listado = await modelotipodonante.ObtenerTipoDonanteDadoId(idTipoDonante);
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

router.post('/CrearTipoDonante', async (req, res) => {
    const objTipoDonante = req.body.objTipoDonante;
    try {

        var listado = await modelotipodonante.CrearTipoDonante(objTipoDonante);
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

router.post('/ActualizarTipoDonante', async (req, res) => {
    const objTipoDonante = req.body.objTipoDonante;

    try {

        var listado = await modelotipodonante.ActualizarTipoDonante(objTipoDonante);
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

router.get('/ActualizarTipoDonanteEstado/:idTipoDonante/:TipoDonante_blEstado', async (req, res) => {
    const idTipoDonante = req.params.idTipoDonante;
    const TipoDonante_blEstado = req.params.TipoDonante_blEstado;
    try {

        var listado = await modelotipodonante.ActualizarTipoDonanteEstado(idTipoDonante, TipoDonante_blEstado);
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

