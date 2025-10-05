const express = require('express');
const router = express.Router();
const Request = require("request");
const modeloempresa = require('../../modelo/empresa/empresa');
const modeloconvenio = require('../../modelo/convenio/convenio');


router.get('/ListadoConvenioTodos/', async (req, res) => {
    try {

        var listado = await modeloconvenio.ListadoConvenioTodos();
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

router.get('/ListadoConvenioDadoIdTipoDonnate/:idTipoDonante', async (req, res) => {

    const idTipoDonnate = req.params.idTipoDonante;
    try {

        var listado = await modeloconvenio.ListadoConvenioDadoIdTipoDonnate(idTipoDonnate);
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

router.get('/ObtenerConvenioDadoId/:idConvenio', async (req, res) => {
    const idConvenio = req.params.idConvenio;
    try {

        var listado = await modeloconvenio.ObtenerConvenioDadoId(idConvenio);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el Convenio",
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

router.post('/CrearConvenio', async (req, res) => {
    const objConvenio = req.body.objConvenio;
    try {

        var ingresoConvenio = await modeloconvenio.CrearConvenio(objConvenio);

        if (ingresoConvenio.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoConvenio.data
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


//Rutas para Convenio Contrato

router.get('/ListadoConvenioContratoTodos/', async (req, res) => {

    try {

        var listado = await modeloconvenio.ListadoConvenioContratoTodos();
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

router.get('/ListadoConvenioContratoActivos/', async (req, res) => {

    try {

        var listado = await modeloconvenio.ListadoConvenioContratoActivos();
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

router.get('/ObtenerConvenioContrato/:idConvenioContrato', async (req, res) => {
    const idConvenioContrato = req.params.idConvenioContrato;
    try {

        var listado = await modeloconvenio.ObtenerConvenioContratoDadoId(idConvenioContrato);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el Contrato",
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

router.post('/CrearConvenioContrato', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const objConvenioContrato = req.body.objConvenioContrato;

    try {

        var ingresoConvenioContrato = await modeloconvenio.CrearConvenioContrato(objConvenioContrato);

        // Verificar si la respuesta contiene datos
        if (ingresoConvenioContrato.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoConvenioContrato.data
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

router.post('/ActualizarConvenioContrato', async (req, res) => {

    const objConvenioContrato = req.body.objConvenioContrato;
    try {

        var actualizarConvenioContrato = await modeloconvenio.ActualizarConvenioContrato(objConvenioContrato);
        if (actualizarConvenioContrato.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarConvenioContrato.data
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

router.get('/ActualizarConvenioContratoEstado/:idConvenioContrato/:conv_cont_blEstado', async (req, res) => {
    const idConvenioContrato = req.params.idConvenioContrato;
    const conv_cont_blEstado = req.params.conv_cont_blEstado;
    try {

        var listado = await modeloconvenio.ActualizarConvenioContratoEstado(idConvenioContrato, conv_cont_blEstado);
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

router.get('/ObtenerConvenioContratoDadoIdConv/:conv_cont_idconvenio', async (req, res) => {
    const conv_cont_idconvenio = req.params.conv_cont_idconvenio;
    try {

        var listado = await modeloconvenio.ObtenerConvenioContratoDadoIdConv(conv_cont_idconvenio);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el Convenio Contrato",
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


//Rutas para Convenio Anexo

router.get('/ListadoConvenioAnexoTodos/', async (req, res) => {

    try {

        var listado = await modeloconvenio.ListadoConvenioAnexoTodos();
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


router.get('/ListadoConvenioAnexoActivos/', async (req, res) => {

    try {

        var listado = await modeloconvenio.ListadoConvenioAnexoActivos();
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

router.get('/ObtenerConvenioAnexo/:idConvenioAnexo', async (req, res) => {
    const idConvenioAnexo = req.params.idConvenioAnexo;
    try {

        var listado = await modeloconvenio.ObtenerConvenioAnexoDadoId(idConvenioAnexo);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe el Anexo",
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

router.post('/CrearConvenioAnexo', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const objConvenioAnexo = req.body.objConvenioAnexo;

    try {

        var ingresoConvenioAnexo = await modeloconvenio.CrearConvenioAnexo(objConvenioAnexo);

        // Verificar si la respuesta contiene datos
        if (ingresoConvenioAnexo.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoConvenioAnexo.data
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


router.post('/ActualizarConvenioAnexo', async (req, res) => {

    const objConvenioAnexo = req.body.objConvenioAnexo;
    try {

        var actualizarConvenioAnexo = await modeloconvenio.ActualizarConvenioAnexo(objConvenioAnexo);
        if (actualizarConvenioAnexo.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarConvenioAnexo.data
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

router.get('/ActualizarConvenioAnexoEstado/:idConvenioAnexo/:conv_anexo_blEstado', async (req, res) => {
    const idConvenioAnexo = req.params.idConvenioAnexo;
    const conv_anexo_blEstado = req.params.conv_anexo_blEstado;
    try {

        var listado = await modeloconvenio.ActualizarConvenioAnexoEstado(idConvenioAnexo, conv_anexo_blEstado);
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

//Rutas para Convenio Institucion

router.get('/ListadoConvenioInstitucionTodos/', async (req, res) => {

    try {

        var listado = await modeloconvenio.ListadoConvenioInstitucionTodos();
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


router.get('/ListadoConvenioInstitucionActivos/', async (req, res) => {

    try {

        var listado = await modeloconvenio.ListadoConvenioInstitucionActivos();
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

router.get('/ObtenerConvenioInstitucion/:idConvenioInstitucion', async (req, res) => {
    const idConvenioInstitucion = req.params.idConvenioInstitucion;
    try {

        var listado = await modeloconvenio.ObtenerConvenioInstitucionDadoId(idConvenioInstitucion);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe un convenio con la institución",
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

router.post('/CrearConvenioInstitucion', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const objConvenioInstitucion = req.body.objConvenioInstitucion;

    try {

        var ingresoConvenioInstitucion = await modeloconvenio.CrearConvenioInstitucion(objConvenioInstitucion);

        // Verificar si la respuesta contiene datos
        if (ingresoConvenioInstitucion.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoConvenioInstitucion.data
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


router.post('/ActualizarConvenioInstitucion', async (req, res) => {

    const objConvenioInstitucion = req.body.objConvenioInstitucion;
    try {

        var actualizarConvenioInstitucion = await modeloconvenio.ActualizarConvenioInstitucion(objConvenioInstitucion);
        if (actualizarConvenioInstitucion.data.length > 0) {
            return res.json({
                success: true,
                datos: actualizarConvenioInstitucion.data
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

router.get('/ActualizarConvenioInstitucionEstado/:idConvenioInstitucion/:conv_inst_blEstado', async (req, res) => {
    const idConvenioInstitucion = req.params.idConvenioInstitucion;
    const conv_inst_blEstado = req.params.conv_inst_blEstado;
    try {

        var listado = await modeloconvenio.ActualizarConvenioAnexoEstado(idConvenioInstitucion, conv_inst_blEstado);
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

//revisar esto es para imprimir el contrato en relacion a lainstitución

router.get('/ObtenerConvenioEmpresa/:idfundacion', async (req, res) => {
    const idfundacion = req.params.idfundacion;
    try {

        var listado = await modeloconvenio.ObtenerConvenioDadoIdempresa(idfundacion);
        if (listado.data.length > 0) {
            return res.json({
                success: true,
                datos: listado.data
            });
        }
        else {
            return res.json({
                success: true,
                mensaje: "No existe un convenio con la empresa",
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


router.get('/pdfConvenioEmpresa/:rucEmpresa', async (req, res) => {
    const rucEmpresa = req.params.rucEmpresa;
    try {
        // Obtener datos de la empresa
        var datosEmpresa = await modeloempresa.EncontrarEmpresaRuc(rucEmpresa);

        if (!datosEmpresa || !datosEmpresa.data || datosEmpresa.data.length === 0) {
            return res.json({
                success: false,
                mensaje: "No se encontraron datos para la empresa con RUC " + rucEmpresa,
                datos: []
            });
        }

        // Acceder a los datos de la empresa (data[0])
        const empresa = datosEmpresa.data[0];

        // Obtener datos del representante
        var datosRepresentante = await modeloempresa.EncontraRepresentante(empresa.idrepresentante);

        if (!datosRepresentante || datosRepresentante.data === undefined) {
            return res.json({
                success: false,
                mensaje: "No se encontró representante para la empresa.",
                datos: {
                    empresa: datosEmpresa,
                    representante: datosRepresentante
                }
            });
        }

        // Acceder a los datos de la empresa (data[0])
        const representante = datosRepresentante.data[0];

        // Obtener datos del convenio
        var datosConvenio = await modeloconvenio.ObtenerConvenioDadoIdempresa(empresa.idfundacion);

        if (!datosConvenio || datosConvenio.data.length === 0) {
            return res.json({
                success: false,
                mensaje: "No se encontró convenio asociado a la empresa.",
                datos: {
                    empresa: datosEmpresa,
                    representante: datosRepresentante,
                    convenio: datosConvenio
                }
            });
        }

        // Obtener detalles del convenio
        var datosDetalleConvenio = await modelocontrato.ObtenerContratoDetalle(datosConvenio.data[0].ouconv_emp_idconvenio);

        if (!datosDetalleConvenio || datosDetalleConvenio.data.length === 0) {
            return res.json({
                success: false,
                mensaje: "No se encontraron detalles del convenio.",
                datos: {
                    empresa: datosEmpresa,
                    representante: datosRepresentante,
                    convenio: datosConvenio,
                    detalleConvenio: datosDetalleConvenio
                }
            });
        }

        // Generar PDF si todos los datos son correctos
        var pdfSolicitud = await reporteconvenio.PdfConvenioEmpresa(empresa, representante, datosConvenio.data[0], datosDetalleConvenio.data);

        if (pdfSolicitud) {
            return res.json({
                success: true,
                ingreso: true,
                mensaje: "PDF base 64 generado",
                datos: {
                    pdf: pdfSolicitud,
                    empresa: datosEmpresa,
                    representante: datosRepresentante,
                    convenio: datosConvenio,
                    detalleConvenio: datosDetalleConvenio
                }
            });
        } else {
            return res.json({
                success: true,
                ingreso: false,
                mensaje: "PDF base 64 vacío",
                datos: ""
            });
        }

    } catch (err) {

        return res.json({
            success: false,
            mensaje: "Error en la generación del PDF",
            empresa: datosEmpresa,
            representante: datosRepresentante,
            convenio: datosConvenio,
            detalleConvenio: datosDetalleConvenio
        });
    }
});


module.exports = router;