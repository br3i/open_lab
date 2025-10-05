const express = require('express');
const router = express.Router();
const Request = require("request");
const modelocargo = require('./../../modelo/catalogos/cargo');


router.get('/ListadoCargoActivo/', async (req, res) => {

    try {

        var listado = await modelocargo.ListadoCargoActivo();
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