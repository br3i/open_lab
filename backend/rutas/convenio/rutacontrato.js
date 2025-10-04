const express = require('express');
const router = express.Router();
const Request = require("request");
const reporteconvenio = require('../reporte/reporteconvenio');
const modelocontrato = require('../../modelo/convenio/contrato');

router.get('/ListadoContratoTodos/', async (req, res) => {
    try {

        var listado = await modelocontrato.ListadoContratoTodos();
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

router.get('/ListadoContratoActivos/', async (req, res) => {

    try {

        var listado = await modelocontrato.ListadoContratoActivos();
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

router.post('/CrearContrato', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const objContrato = req.body.objContrato;

    try {

        var ingresoContrato = await modelocontrato.CrearContrato(objContrato);

        // Verificar si la respuesta contiene datos
        if (ingresoContrato.data.length > 0) {
            return res.json({
                success: true,
                datos: ingresoContrato.data
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

router.get('/ActualizarContratoEstado/:idContrato/:blEstado', async (req, res) => {
    const idContrato = req.params.idContrato;
    const blEstado = req.params.blEstado;
    try {

        var listado = await modelocontrato.ActualizarContratoEstado(idContrato, blEstado);
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

router.get('/CrearContratoClausula/:idContrato/:idClausula', async (req, res) => {
    const idContrato = req.params.idContrato;
    const idClausula = req.params.idClausula;

    try {

        var listado = await modelocontrato.CrearContratoClausula(idContrato, idClausula);
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

router.get('/CrearContratoClausulaSubclausula/:idContrato/:idClausula/:idSubclausula', async (req, res) => {
    const idContrato = req.params.idContrato;
    const idClausula = req.params.idClausula;
    const idSubclausula = req.params.idSubclausula;

    try {

        var listado = await modelocontrato.CrearContratoClausulaSubClausula(idContrato, idClausula, idSubclausula);
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

router.get('/CrearContratoSubclausulaItems/:idContrato/:idSubclausula/:idItems', async (req, res) => {
    const idContrato = req.params.idContrato;
    const idSubclausula = req.params.idSubclausula;
    const idItems = req.params.idItems;

    try {

        var listado = await modelocontrato.CrearContratoSubclausulaItems(idContrato, idSubclausula, idItems);
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


//previsualizar el formato del convenio
router.post('/PrevisualizacionpdfContrato', async function (req, res) {
    try {
        const objPrevisualizacion = req.body.objPrevisualizacion;

        var pdfSolicitud = await reporteconvenio.PrevisualizacionpdfContrato(objPrevisualizacion);
        if (pdfSolicitud != "") {
            return res.json({
                success: true,
                ingreso: true,
                mensaje: "pdf base 64generado",
                datos: pdfSolicitud
            });
        } else {
            return res.json({
                success: true,
                ingreso: true,
                mensaje: "pdf base 64 vacio",
                datos: ""
            });
        }
    } catch (err) {
        console.log('Error: ' + err)
    }
});

//Mostrar detalle de contrato guardado

router.get('/ObtenerpdfEstructuraContrato/:idContrato', async (req, res) => {
  const idContrato = req.params.idContrato;

  try {
    const datosContrato = await modelocontrato.ObtenerContratoDetalle(idContrato);
    
    if (!datosContrato || !datosContrato.data || datosContrato.data.length === 0) {
      return res.json({
        success: false,
        mensaje: `No se encontraron datos para este contrato: ${idContrato}`,
        datos: []
      });
    }

    // Obtener título y descripción del contrato
    const contratoTitulo = datosContrato.data[0].oucontrato_strtitulo || '';
    const contratoDescripcion = datosContrato.data[0].oucontrato_strdescripcion || '';

    // Preparar estructuras jerárquicas si existen
    const clausulas = [];
    const subclausulasMap = {};
    const itemsMap = {};

    for (const item of datosContrato.data) {
      const { oucont_clau_idtipo, oucont_clau_idhija, oucont_clau_idpadre } = item;

      if (oucont_clau_idtipo === 1) {
        clausulas.push({
          clausula_id: oucont_clau_idhija,
          clausula_titulo: item.ouclausula_strtitulo || '',
          clausula_descripcion: item.ouclausula_strdescripcion || '',
          subclausulas: []
        });
      } else if (oucont_clau_idtipo === 2) {
        const subclausula = {
          subclausula_id: oucont_clau_idhija,
          subclausula_titulo: item.ousubclausula_strtitulo || '',
          subclausula_descripcion: item.ousubclausula_strdescripcion || '',
          items: []
        };
        (subclausulasMap[oucont_clau_idpadre] ||= []).push(subclausula);
      } else if (oucont_clau_idtipo === 3) {
        const itemData = {
          item_titulo: item.ouitems_strtitulo || '',
          item_descripcion: item.ouitems_strdescripcion || ''
        };
        (itemsMap[oucont_clau_idpadre] ||= []).push(itemData);
      }
    }

    // Asignar jerarquía: subcláusulas → cláusulas, ítems → subcláusulas
    for (const clausula of clausulas) {
      const subclausulas = subclausulasMap[clausula.clausula_id] || [];
      for (const subclausula of subclausulas) {
        subclausula.items = itemsMap[subclausula.subclausula_id] || [];
      }
      clausula.subclausulas = subclausulas;
    }

    // Generar PDF (aunque clausulas sea [])
    const pdfContrato = await reporteconvenio.PrevisualizacionpdfContrato({
      contrato_strtitulo: contratoTitulo,
      contrato_strdescripcion: contratoDescripcion,
      clausulas: clausulas // puede estar vacío
    });

    if (pdfContrato) {
      return res.json({
        success: true,
        ingreso: true,
        mensaje: "PDF base 64 generado",
        datos: { pdf: pdfContrato }
      });
    } else {
      return res.json({
        success: true,
        ingreso: false,
        mensaje: "PDF generado pero sin contenido visual",
        datos: ""
      });
    }

  } catch (err) {
    console.error("Error al generar el PDF:", err);
    return res.json({
      success: false,
      mensaje: "Error en la generación del PDF"
    });
  }
});



router.post('/GenerarpdfContrato', async (req, res) => {

    const objDatosConveioEmpresa = req.body.objDatosConveioEmpresa;

    const idContrato = objDatosConveioEmpresa.idContrato;
    try {
        const datosContrato = await modelocontrato.ObtenerContratoDetalle(idContrato);
        console.log("DATOS", datosContrato)
        if (!datosContrato || !datosContrato.data || datosContrato.data.length === 0) {
            return res.json({
                success: false,
                mensaje: "No se encontraron datos para este contrato: " + idContrato,
                datos: []
            });
        }

        // Arreglo para mantener el orden de cláusulas segun su fecha de creación
        const clausulas = [];

        // Crear un mapa para subcláusculas e ítems, que se asignarán a las cláusulas respectivas
        const subclausulasMap = {};
        const itemsMap = {};

        // Recorrer los datos en el orden de fecharegistro
        datosContrato.data.forEach(item => {
            const { oucont_clau_idtipo, oucont_clau_idhija, oucont_clau_idpadre } = item;

            // Si es una cláusula (tipo 1)
            if (oucont_clau_idtipo === 1) {
                // Añadir la cláusula al arreglo principal
                clausulas.push({
                    clausula_id: oucont_clau_idhija, // Guardamos el id para asociar con las subcláusulas
                    clausula_titulo: item.ouclausula_strtitulo || '',
                    clausula_descripcion: item.ouclausula_strdescripcion || '',
                    subclausulas: []
                });
            }

            // Si es una subcláuscula (tipo 2)
            if (oucont_clau_idtipo === 2) {
                const subclausula = {
                    subclausula_id: oucont_clau_idhija,
                    subclausula_titulo: item.ousubclausula_strtitulo || '',
                    subclausula_descripcion: item.ousubclausula_strdescripcion || '',
                    items: []
                };

                // Guardar la subcláuscula en el mapa con su padre (cláusula)
                if (!subclausulasMap[oucont_clau_idpadre]) {
                    subclausulasMap[oucont_clau_idpadre] = [];
                }
                subclausulasMap[oucont_clau_idpadre].push(subclausula);
            }

            // Si es un ítem (tipo 3)
            if (oucont_clau_idtipo === 3) {
                const itemData = {
                    item_titulo: item.ouitems_strtitulo || '',
                    item_descripcion: item.ouitems_strdescripcion || ''
                };

                // Guardar el ítem en el mapa con su padre (subcláuscula)
                if (!itemsMap[oucont_clau_idpadre]) {
                    itemsMap[oucont_clau_idpadre] = [];
                }
                itemsMap[oucont_clau_idpadre].push(itemData);
            }
        });

        // Asignar subcláusculas a las cláusulas en el orden correcto, solo si tienen subcláusculas
        clausulas.forEach((clausula) => {
            const clausulaId = clausula.clausula_id; // ID de la cláusula
            if (subclausulasMap[clausulaId]) {
                // Solo asignar subcláusculas si existen en el mapa
                clausula.subclausulas = subclausulasMap[clausulaId];

                // Para cada subcláuscula, asignar ítems solo si existen ítems
                clausula.subclausulas.forEach((subclausula) => {
                    const subclausulaId = subclausula.subclausula_id; // ID de la subcláuscula
                    if (itemsMap[subclausulaId]) {
                        // Solo asignar ítems si existen en el mapa
                        subclausula.items = itemsMap[subclausulaId];
                    }
                });
            }
        });

        // Generar PDF con la estructura jerárquica 
        const pdfContrato = await reporteconvenio.pdfContratoGenerar({
            contrato_strtitulo: datosContrato.data[0].oucontrato_strtitulo,
            contrato_strdescripcion: datosContrato.data[0].oucontrato_strdescripcion,
            clausulas: clausulas, ...objDatosConveioEmpresa
        });

        if (pdfContrato != "") {
            return res.json({
                success: true,
                ingreso: true,
                mensaje: "PDF base 64 generado",
                datos: {
                    pdf: pdfContrato
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
        });
    }
});


module.exports = router;