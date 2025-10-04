const express = require('express');
const router = express.Router();
const Request = require("request");
const modelosubclausula=require('../../modelo/convenio/subclausula');

router.get('/ListadoSubclausulaTodos/', async (req, res) => {

    try {

        var listado = await modelosubclausula.ListadoSubclausulaTodos();
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


router.get('/ListadoSubclausulaActivos/', async (req, res) => {

    try {

        var listado = await modelosubclausula.ListadoSubclausulaActivos();
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

router.post('/CrearSubclausula', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const objSubclausula = req.body.objSubclausula;

    try {
   
        var ingresoSubclausula = await modelosubclausula.CrearSubclausula(objSubclausula);

        // Verificar si la respuesta contiene datos
        if (ingresoSubclausula.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoSubclausula.data
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


router.post('/ActualizarSubclausula', async (req, res) => {
  
    const objSubclausula = req.body.objSubclausula;
    try {

        var actualizarSubclausula = await modelosubclausula.ActualizarSubclausula(objSubclausula);
        if (actualizarSubclausula.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarSubclausula.data
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

router.get('/ActualizarSubclausulaEstado/:idSubclausula/:blEstado', async (req, res) => {
    const idSubclausula = req.params.idSubclausula;
    const blEstado = req.params.blEstado;
    try {

        var listado = await modelosubclausula.ActualizarSubclausulaEstado(idSubclausula, blEstado);
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


router.get('/ObtenerSubclausula/:idSubclausula', async (req, res) => {
    const idSubclausula = req.params.idSubclausula;
    try {

        var listado = await modelosubclausula.ObtenerSubclausulaDadoId(idSubclausula);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe la subclausula",
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

router.get('/ListaSubclausulaDadoIdclausula/:idClausula', async (req, res) => {
    const idClausula = req.params.idClausula;
    try {

        var listado = await modelosubclausula.ListaSubclausulaDadoIdclausula(idClausula);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe los items",
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

router.get('/CrearRelacionSubclausulaItems/:sub_items_idSubclausula/:sub_items_idItems', async (req, res) => {
    const sub_items_idSubclausula = req.params.sub_items_idSubclausula;
    const sub_items_idItems = req.params.sub_items_idItems;

    try {

        var listado = await modelosubclausula.CrearRelacionSubclausulaItems(sub_items_idSubclausula,sub_items_idItems);
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