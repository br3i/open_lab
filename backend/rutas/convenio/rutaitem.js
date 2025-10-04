const express = require('express');
const router = express.Router();
const Request = require("request");
const modeloitem=require('../../modelo/convenio/item');

router.get('/ListadoItemTodos/', async (req, res) => {

    try {

        var listado = await modeloitem.ListadoItemTodos();
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

router.get('/ListadoItemActivos/', async (req, res) => {

    try {

        var listado = await modeloitem.ListadoItemActivos();
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

router.post('/CrearItem', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud

    const objItem = req.body.objItem;

    try {
   
        var ingresoItem = await modeloitem.CrearItem(objItem);

        // Verificar si la respuesta contiene datos
        if (ingresoItem.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoItem.data
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

router.post('/ActualizarItem', async (req, res) => {
  
    const objItem = req.body.objItem;
    try {

        var actualizarItem = await modeloitem.ActualizarItem(objItem);
        if (actualizarItem.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarItem.data
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

router.get('/ActualizarItemEstado/:idItem/:blEstado', async (req, res) => {
    const idItem = req.params.idItem;
    const blEstado = req.params.blEstado;
    try {

        var listado = await modeloitem.ActualizarItemEstado(idItem, blEstado);
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

router.get('/ObtenerItem/:idItem', async (req, res) => {
    const idItem = req.params.idItem;
    try {

        var listado = await modeloitem.ObtenerItemDadoId(idItem);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe un Item con la empresa",
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

router.get('/ListaSubclausulaDadoIdsubclausula/:idSubclausula', async (req, res) => {
    const idSubclausula = req.params.idSubclausula;
    try {

        var listado = await modeloitem.ListaSubclausulaDadoIdsubclausula(idSubclausula);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe la item",
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