const express = require('express');
const router = express.Router();
const Request = require("request");
const modeloclausula=require('../../modelo/convenio/clausula');

router.get('/ListadoClausulaTodos/', async (req, res) => {
    try {

        var listado = await modeloclausula.ListadoClausulaTodos();
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

router.get('/ListadoClausulaActivos/', async (req, res) => {

    try {

        var listado = await modeloclausula.ListadoClausulaActivos();
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

router.post('/CrearClausula', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const objClausula = req.body.objClausula;

    try {
   
        var ingresoClausula = await modeloclausula.CrearClausula(objClausula);

        // Verificar si la respuesta contiene datos
        if (ingresoClausula.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoClausula.data
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

router.post('/ActualizarClausula', async (req, res) => {
  
    const objClausula = req.body.objClausula;
    try {

        var actualizarClausula = await modeloclausula.ActualizarClausula(objClausula);
        if (actualizarClausula.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarClausula.data
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

router.get('/ActualizarClausulaEstado/:idClausula/:blEstado', async (req, res) => {
    const idClausula = req.params.idClausula;
    const blEstado = req.params.blEstado;
    try {

        var listado = await modeloclausula.ActualizarClausulaEstado(idClausula, blEstado);
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

router.get('/ObtenerClausulaDadoId/:idClausula', async (req, res) => {
    const idClausula = req.params.idClausula;
    try {

        var listado = await modeloclausula.ObtenerClausulaDadoId(idClausula);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe la clausula",
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

router.get('/CrearRelacionClausulaSubclausula/:clau_sub_idClausula/:clau_sub_idSubclausula', async (req, res) => {
    const clau_sub_idClausula = req.params.clau_sub_idClausula;
    const clau_sub_idSubclausula = req.params.clau_sub_idSubclausula;

    try {

        var listado = await modeloclausula.CrearRelacionClausulaSubclausula(clau_sub_idClausula,clau_sub_idSubclausula);
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