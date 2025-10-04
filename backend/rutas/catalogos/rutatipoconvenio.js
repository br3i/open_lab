const express = require('express');
const router = express.Router();
const Request = require("request");
const modelotipoconvenio=require('../../modelo/catalogos/tipoconvenio');


router.get('/ListadoTipoConvenioActivos/', async (req, res) => {

    try {

        var listado = await modelotipoconvenio.ListadoTipoConvenioActivos();
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

router.get('/ListadoTipoConvenioTodos/', async (req, res) => {

    try {

        var listado = await modelotipoconvenio.ListadoTipoConvenioTodos();
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

router.get('/ObtenerTipoConvenioDadoId/:idTipoConvenio', async (req, res) => {
    const idTipoConvenio = req.params.idTipoConvenio;
    try {

        var listado = await modelotipoconvenio.ObtenerTipoConvenioDadoId(idTipoConvenio);
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

router.post('/CrearTipoConvenio', async (req, res) => {
    const objTipoConvenio = req.body.objTipoConvenio;
    try {

        var listado = await modelotipoconvenio.CrearTipoConvenio(objTipoConvenio);
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

router.post('/ActualizarTipoConvenio', async (req, res) => {
    const objTipoConvenio = req.body.objTipoConvenio;
    try {

        var listado = await modelotipoconvenio.ActualizarTipoConvenio(objTipoConvenio);
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

router.get('/ActualizarTipoConvenioEstado/:idTipoConvenio/:TipoConvenio_blEstado', async (req, res) => {
    const idTipoConvenio = req.params.idTipoConvenio;
    const TipoConvenio_blEstado = req.params.TipoConvenio_blEstado;
    try {

        var listado = await modelotipoconvenio.ActualizarTipoConvenioEstado(idTipoConvenio, TipoConvenio_blEstado);
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

