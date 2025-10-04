const express = require('express');
const router = express.Router();
const Request = require("request");
const fs = require("fs");
const pdf = require('html-pdf');
const pathimage = require('path');
const tools = require('../tools');
const modelocentral = require('../../modelo/persona/central');
const modeloempresa = require("../../modelo/empresa/empresa");

const parametroConfigurable = require('../../config/parametroConfigurable');


module.exports.PdfSolicitudVoluntario = async function (objVoluntario) {
  try {
    var pdfVoluntario = await pdfSolicitudVoluntarioProceso(objVoluntario);
    return pdfVoluntario
  } catch (error) {
    console.log(error);
  }
}
module.exports.PdfTerminosAceptacion = async function (objTerminos, objAceptacion) {
  try {
    var pdfVoluntario = await pdfTerminoVoluntarioAceptacion(objTerminos, objAceptacion);
    return pdfVoluntario
  } catch (error) {
    console.log(error);
  }
}
module.exports.PdfCartaCompromiso = async function (objTerminos, objAceptacion, idPersona, strCedula) {
  try {
    var pdfVoluntario = await pdfCartaAceptacionAceptacion(objTerminos, objAceptacion, idPersona, strCedula);
    return pdfVoluntario
  } catch (error) {
    console.log(error);
  }
}
async function pdfSolicitudVoluntarioProceso(objVoluntario) {
  try {
    try {
      const htmlContent = `
            <!DOCTYPE html>
              <html lang="es">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Solicitud Voluntario</title>
                  <style>
                    h2 {
                      margin: 0;
                    }
                    body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      box-sizing: border-box;
                      height: 100%;  /* Asegurarse de que no haya espacio en exceso */
                      page-break-inside: avoid;  /* Evitar saltos de página dentro del contenido */

                    }
                    .container {
                      max-width: 800px;
                      margin: 100px auto;
                      padding: 20px;
                      border: 1px solid #ccc;
                      border-radius: 8px;
                      background-color: #f9f9f9;
                      display: flex;
                      flex-wrap: wrap;
                    }
                    .left-section {
                      flex: 1;
                      padding-right: 20px;
                      box-sizing: border-box;
                    }
                    .right-section {
                      flex-basis: 200px; /* Tamaño fijo para la foto */
                      text-align: center;
                      margin-left: auto;
                    }
                    .right-section h2 {
                      font-size: 20px;
                      margin-top: 10px;
                    }
                    img {
                      max-width: 55%;
                      height: auto;
                     
                      /* margin-bottom: 20px; */
                    }
                    .section {
                      margin-bottom: 20px;
                    }

                    .section p {
                      font-size: 15px;
                      page-break-inside: avoid;  /* Evitar saltos de página dentro de bloques y párrafos */
                    }
                    h2.subtitulo {
                      background-color: #f2f2f2;
                      padding: 8px;
                      border-radius: 8px;
                      margin-top: 0;
                      font-size: 17px;
                    }

                    .datos-personales {
                      display: flex;
                      margin: 25px 0px;
                    }
                  </style>
                </head>
                <body>
                  <div c>
                    <div class="section-datos-personales">
                      <h1 style="text-align: center">Solicitud Voluntario</h1>

                      <h2 class="subtitulo">Datos Personales</h2>
                      <div class="datos-personales">
                        <div class="section">
                          <p><strong>Nombres:</strong> ${objVoluntario.ounombres}</p>
                          <p>
                            <strong>Apellidos:</strong> ${objVoluntario.ouapellidos}
                          </p>
                          <p><strong>Edad:</strong> ${objVoluntario.ouedad}</p>
                          <p><strong>Correo:</strong> ${objVoluntario.oucorreo1}</p>
                        </div>
                        <div class="right-section">
                          <img src=${objVoluntario.strFoto} alt="Foto de perfil" />
                          <h2>Foto</h2>
                        </div>
                      </div>
                    </div>
                    <div class="left-section">
                      <div class="section">
                        <h2 class="subtitulo">Estudios</h2>
                        <p><strong>Estudios:</strong> ${objVoluntario.ounombre_estudio}</p>
                        <p>
                          <strong>Area Conocimiento:</strong>
                          ${objVoluntario.ounombre_area_conocimiento}
                        </p>
                      </div>
                      <div class="section">
                        <h2 class="subtitulo">Situacion Laboral</h2>
                        <p>
                          <strong>Situacion:</strong>
                          ${objVoluntario.ounombre_situacion_laborale}
                        </p>
                        <p><strong>Empresa:</strong> ${objVoluntario.ounombreempresa}</p>
                      </div>
                      <div class="section">
                        <h2 class="subtitulo">Voluntario</h2>
                        <p>
                          <strong>Tipo:</strong> ${objVoluntario.ounombre_tipovoluntario}
                        </p>
                        <p>
                          <strong>Disponibilidad:</strong>
                          ${objVoluntario.ounombre_disponibilidad}
                        </p>
                      </div>
                    </div>
                  </div>
                </body>
                         
              </html>
            
            `.trim();


      var encabezado = await tools.encabezadoOcultoHtml();  // Resuelve la promesa
      const alturaEncabezado = tools.calcularAlturaEncabezado(encabezado);

      var htmlCompleto = encabezado + htmlContent + tools.piepaginaOcultoHtml();
      const options = {
        format: 'A4',

        border: {
          top: '1.0cm',    // Margen superior para incluir un encabezado
          right: '1.5cm',  // Margen derecho para dejar espacio suficiente
          bottom: '2.0cm', // Margen inferior para el pie de página
          left: '1.5cm'    // Margen izquierdo, suficiente si no se va a encuadernar
        },

        header: {
          height: alturaEncabezado,
          contents: await tools.encabezadoHtml()
        },

        footer: {
          height: '1px',
          contents: tools.piepaginaHtml()
        },

      };
      var base64 = await tools.Generarpdfhtml(htmlCompleto, options)
      return base64
    } catch (error) {
      console.error(error);
      return 'ERROR';
    }
  } catch (err) {
    console.log(error);
    return 'ERROR';
  }
}
async function pdfTerminoVoluntarioAceptacion(objVoluntario, objAceptacion) {
  try {
    try {
      var textcomplemento = "<h4 style='text-align: center;'> TÉRMINOS Y CONDICIONES </h4> ";
      var Datos = `</br><p><strong>Fecha Aceptación: </strong>${tools.ConvertirFormatoFecha(objAceptacion.fechaaceptacion)}</p>`
      var fin = Datos + "</div>"


      var encabezado = await tools.encabezadoOcultoHtml();  // Resuelve la promesa
      const alturaEncabezado = tools.calcularAlturaEncabezado(encabezado);

      var htmlCompleto = encabezado + htmlContent + tools.piepaginaOcultoHtml();

      var htmlContent = textcomplemento + objVoluntario.strtexto + fin;
      var htmlCompleto = encabezado + htmlContent + tools.piepaginaOcultoHtml();

      const options = {
        format: 'A4',

        border: {
          top: '1.0cm',    // Margen superior para incluir un encabezado
          right: '1.5cm',  // Margen derecho para dejar espacio suficiente
          bottom: '2.0cm', // Margen inferior para el pie de página
          left: '1.5cm'    // Margen izquierdo, suficiente si no se va a encuadernar
        },

        header: {
          height: alturaEncabezado,
          contents: await tools.encabezadoHtml(),
        },

        footer: {
          height: '10px',
          contents: tools.piepaginaHtml()
        },
      };
      var base64 = await tools.Generarpdfhtml(htmlCompleto, options)
      return base64
    } catch (error) {
      console.error(error);
      return 'ERROR';
    }
  } catch (err) {
    console.log(error);
    return 'ERROR';
  }
}

async function pdfCartaAceptacionAceptacion(objVoluntario, objAceptacion, idPersona, strCedula) {
  try {
    try {
      var ObtenerDatos = await modelocentral.EncontrarPersonaDadoId(idPersona);
      const htmlContent = objVoluntario.strtexto;

      var textcomplemento = "<h4 style='text-align: center;'>CARTA COMPROMISO</h4>";
      var Datos = `<br><p><strong>Fecha Aceptación: </strong>${tools.ConvertirFormatoFecha(objAceptacion.fechaaceptacion)}</p>`;
      var fin = Datos + "</div>";

      var texto = `
        <p>El suscrito <strong>${ObtenerDatos.data[0].nombres} ${ObtenerDatos.data[0].apellidos}</strong>, 
        portador de la cédula de Ciudadanía No. <strong>${strCedula}</strong>, expedida en 
        <strong>${ObtenerDatos.data[0].apellidos}</strong>, con domicilio particular en la dirección 
        <strong>${ObtenerDatos.data[0].direccion}</strong> de la ciudad de <strong>RIOBAMBA</strong>, con teléfono 
        <strong>${ObtenerDatos.data[0].celular1}</strong> y correo electrónico <strong>${ObtenerDatos.data[0].correo2}</strong>, 
        expresamente manifiesto que asumo con el <strong>BANCO DE ALIMENTOS RIOBAMBA (BAR)</strong> los acuerdos y compromisos 
        determinados en las siguientes cláusulas:</p>
      `;

      // Generar el encabezado
      var encabezado = await tools.encabezadoOcultoHtml();  // Resuelve la promesa
      const alturaEncabezado = tools.calcularAlturaEncabezado(encabezado);  // Calcula la altura del encabezado

      // Ajustar el margen superior dinámicamente en función de la altura del encabezado
      var marginTop = `${parseFloat(alturaEncabezado) + 50}px`;

      // Incluir el margen-top calculado dinámicamente
      var htmlCompleto = `
        ${encabezado}
        <div style="margin-top: ${marginTop}; text-align: justify;">
          ${textcomplemento}
          ${texto}
          ${htmlContent}
          ${fin}
        </div>
        ${tools.piepaginaOcultoHtml()}
      `;

      // Configuración del PDF
      const options = {
        format: 'A4',
        border: {
          top: '1.0cm',    // Margen superior ajustado para incluir el encabezado dinámico
          right: '1.5cm',
          bottom: '2.0cm', // Margen inferior para el pie de página
          left: '1.5cm'
        },

        header: {
          height: alturaEncabezado,
          contents: await tools.encabezadoHtml()  // Usa el encabezado HTML calculado
        },

        footer: {
          height: '10px',
          contents: tools.piepaginaHtml()  // Usa el pie de página HTML
        }
      };

      // Generar el PDF
      var base64 = await tools.Generarpdfhtml(htmlCompleto, options);
      return base64;
    } catch (error) {
      console.error(error);
      return 'ERROR';
    }
  } catch (err) {
    console.log(error);
    return 'ERROR';
  }
}

module.exports.PdfReporteDonacion = async function (objDonacion) {
  try {
    var pdfDonacion = await PdfReporteDonacionProceso(objDonacion);
    return pdfDonacion
  } catch (error) {
    console.log(error);
  }
}

async function PdfReporteDonacionProceso(objDonacion) {
  try {
    // Validar si los datos requeridos están presentes
    if (!objDonacion) {
      console.warn('Generando PDF con datos incompletos, verifique los campos.');
    }
    // Generar el encabezado dinámico
    const encabezadoHtml = await tools.encabezadoOcultoHtml();
    const alturaEncabezado = tools.calcularAlturaEncabezado(encabezadoHtml);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reporte de Donaciones</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              box-sizing: border-box;
            }
             .container {
              max-width: 100%;
              margin-top:0cm;
              padding: 20px;
            }
            img {
              max-width: 55%;
              height: auto;
            }
            h1 {
              text-align: center;
              font-size: 24px;
              margin-bottom: 20px;
            }
            h2 {
              background-color: #f2f2f2;
              padding: 10px;
              border-radius: 5px;
              font-size: 18px;
              margin-top: 20px;
            }
            .tabla-reporte {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            .tabla-reporte th,
            .tabla-reporte td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: left;
              font-size: 14px;
            }

            .tabla-reporte th {
              background-color: #f2f2f2;
            }
            .total {
              font-weight: bold;
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Reporte de Donaciones</h1>
            <h2>Información General</h2>
            <p><strong>Empresa:</strong> ${objDonacion.nombreEmpresa}</p>
            <p><strong>Generado por:</strong> ${objDonacion.usuarioLogeado}</p>
            <p><strong>Fecha de Generación:</strong> ${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString('es-ES')}</p>

            <h2>Detalle de Donaciones</h2>
            <table class="tabla-reporte">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Sucursal</th>
                  <th>Producto</th>
                  <th>Contenedor</th>
                  <th>Cantidad</th>
                  <th>Peso (kg)</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${objDonacion.donaciones.map((donacion, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(donacion.fechaDonacion).toLocaleDateString('es-ES')} ${new Date(donacion.fechaDonacion).toLocaleTimeString('es-ES')}</td>
                    <td>${donacion.sucursal || 'Sin especificar'}</td>
                    <td>${donacion.producto || 'Sin especificar'}</td>
                    <td>${donacion.contenedor || 'Sin especificar'}</td>
                    <td style="text-align: right;">${donacion.cantidad || 0}</td>
                    <td style="text-align: right;">${donacion.peso || 0}</td>
                    <td>${donacion.estado || 'Sin especificar'}</td>
                  </tr>
                `).join('')}

                  <tr style="font-weight: bold; background-color: #f0f0f0;">
                    <td colspan="5" style="text-align: right;">TOTAL:</td>
                    <td style="text-align: right;">
                      ${objDonacion.donaciones.reduce((acc, don) => acc + Number(don.cantidad || 0), 0)}
                    </td>
                    <td style="text-align: right;">
                      ${objDonacion.donaciones.reduce((acc, don) => acc + Number(don.peso || 0), 0).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
              </tbody>
            </table>
                 <div class="footer">
              <p>Reporte generado automáticamente por el sistema del Banco de Alimentos.</p>
            </div>
          </div>
        </body>
      </html>
    `.trim();


    var htmlCompleto = encabezadoHtml + htmlContent + tools.piepaginaOcultoHtml();
    // Opciones de configuración del PDF
    const options = {
      format: 'A4',
      border: {
        top: '0cm',  // Margen inicial estándar
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm',
      },
      header: {
        height: alturaEncabezado,
        contents: await tools.encabezadoHtml(),
      },
      footer: {
        height: '1.5cm',
        contents: tools.piepaginaHtml(),
      },
    };

    var base64 = await tools.Generarpdfhtml(htmlCompleto, options);
    return base64;
  } catch (error) {
    console.error(error);
    return 'ERROR';
  }
}

module.exports.PdfActaEntrega = async function (usuarioLogeado, objFundacion, objDetalleKits, objDetalleContenedor) {
  try {
    var pdfDonacion = await PdfActaEntrega(usuarioLogeado, objFundacion, objDetalleKits, objDetalleContenedor);
    return pdfDonacion
  } catch (error) {
    console.log(error);
  }
}
async function PdfActaEntrega(usuarioLogeado, objFundacion, objDetalleKits, objDetalleContenedor) {
  try {
    if (!usuarioLogeado || !objFundacion || !Array.isArray(objDetalleKits) || !Array.isArray(objDetalleContenedor)) {
      console.warn('Datos incompletos para generar el acta de entrega.');
      return 'ERROR';
    }

    const encabezadoHtml = await tools.encabezadoOcultoHtml();
    const alturaEncabezado = tools.calcularAlturaEncabezado(encabezadoHtml);

    const fechaDonacion = new Date(objFundacion.oufund_don_dtfechadonacion);
    const fechaRetorno = new Date(fechaDonacion);
    fechaRetorno.setDate(fechaDonacion.getDate() + 1);

    const idCargo = parametroConfigurable.tipoCargo.REPRESENTANTE_LEGAL;
    const datosRepresentante = await modeloempresa.ObtenerRepresentanteId(
      objFundacion.oufund_don_idresponsablefundacion,
      objFundacion.oufund_don_idempresa,
      idCargo
    );

    const representante = datosRepresentante.data[0];

    // Agrupación de productos
    const resumenAlimentos = {};
    let totalPeso = 0;

 for (const item of objDetalleKits || []) {
  const tipo = item.outipo_alimento;
  const peso = parseFloat(item.outotal_peso_kg) || 0;
  if (!resumenAlimentos[tipo]) resumenAlimentos[tipo] = 0;
  resumenAlimentos[tipo] += peso;
  totalPeso += peso;
}
    // Conteo total de contenedores
    let totalContenedores = 0;

for (const c of objDetalleContenedor || []) {
  totalContenedores += parseInt(c.outotal_contenedor || 0);
}

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Acta de Entrega</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
        }
        h1, h2 {
          text-align: center;
          margin-bottom: 10px;
        }
        .tabla-reporte {
          width: 80%;
          border-collapse: collapse;
          margin: 10px auto;

        }

        .tabla-reporte th, .tabla-reporte td {
          border: 1px solid #999;
          padding: 4px 6px;
          font-size: 12px;
          line-height: 1.2;
        }

        .tabla-reporte th {
          background-color: #f5f5f5;
          font-weight: bold;
          text-align: left;
        }

        ul {
          margin-top: 10px;
        }
        .footer {
          font-size: 12px;
          color: #555;
          text-align: center;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <p style="text-align: right;">Riobamba ${fechaDonacion.toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <h1>ACTA DE ENTREGA</h1>
      <h2>"${objFundacion.ouempresa_strnombre}"</h2>

      <p style="line-height: 2.5;">
        Se hace <strong>PRÉSTAMO DE GAVETAS</strong> para el transporte de alimento a la fundación 
        <strong>${objFundacion.ouempresa_strnombre}</strong>, en representación de la Sra/Sr ..................................................., 
        con condición a retornarlas el <strong>${fechaRetorno.toLocaleDateString('es-EC')}</strong> a las 
        <strong>09:00 am</strong>.
      </p>

      <table class="tabla-reporte">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          ${(objDetalleContenedor || []).map(c => `
          <tr>
            <td>${c.oucontenedor_strnombre}</td>
            <td style="text-align: right;">${c.outotal_contenedor}</td>
          </tr>`).join('')}
          <tr>
            <td><strong>TOTAL</strong></td>
            <td style="text-align: right;"><strong>${totalContenedores}</strong></td>
          </tr>
        </tbody>
      </table>

      <p>Se hace ENTREGA de los siguientes productos, misma que se detallan a continuación:</p>

      <table class="tabla-reporte">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Peso (kg)</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(resumenAlimentos).map(([tipo, peso]) => `
          <tr>
            <td>${tipo}</td>
            <td style="text-align: right;">${peso.toFixed(1)}</td>
          </tr>`).join('')}
          <tr>
            <td><strong>Peso total:</strong></td>
            <td style="text-align: right;"><strong>${totalPeso.toFixed(1)}</strong></td>
          </tr>
        </tbody>
      </table>

      <p><strong>Al firmar, el representante acepta lo siguiente:</strong></p>
      <ul>
        <li>En caso de pérdida o daño de las gavetas se hará responsable de reponerlas.</li>
        <li>Retornar las gavetas en la fecha y hora acordadas.</li>
        <li>Que ha constatado el peso y seguridad alimentaria proporcionada por el BAR.</li>
        <li>Se responsabiliza de custodiar la seguridad alimentaria y de entregar el alimento en la cantidad indicada.</li>
        <li>Entrega de donaciones: Lunes 3:30 p.m - 4:00 p.m. Jueves a viernes: 3:00 p.m - 3:30 p.m.</li>
        <li>Devolución de gavetas: Lunes a viernes 9:00 a.m - 12:00 p.m. (plazo máximo de dos días laborables para su entrega).</li>
      </ul>

      <div style="margin-top: 25px;"></div>
      <p><strong>Observaciones:</p>

      <p>__________________________________________________________________________________________________________________________________________________________________________________________________________________________________</p>
      <p>___________________________________________________________________________________________________________________________________________________________________________________________________________________________________</p>
     
      <div style="margin-top: 100px;"></div>
      
      <table style="width: 100%; margin-top: 30px; border: none;">
        <tr>
          <td style="text-align: center; border: none; width: 40%; line-height: 1.2; margin: 0;">
            <p style="margin: 2px 0;">______________________________</p>
            <p style="margin: 2px 0;">Entrega Conforme</p>
            <p style="margin: 2px 0;">Ing. Leslie Lugmaña</p>
            <p style="margin: 2px 0;">Técnica operativa</p>
          </td>
          <td style="text-align: center; border: none; width: 20%;"></td>
          <td style="border: none; width: 40%; line-height: 1.2; margin: 0;">
            <p style="margin: 2px 0;">______________________________</p>
            <p style="margin: 2px 0; text-align: center;">Recibe Conforme</p>
            <p style="margin: 2px 0;">Nombre: </p>
            <p style="margin: 2px 0;">C.I.: </p>
          </td>
        </tr>
      </table>
            <div style="margin-top: 100px;"></div>

      <p>
        NOTA: Entregar una copia de esta acta a la persona que esté en representación.
      </p>
    </body>
   
    </html>
    `.trim();

    const htmlCompleto = encabezadoHtml + htmlContent + tools.piepaginaOcultoHtml();

    const options = {
      format: 'A4',
      border: {
        top: '0cm',
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm',
      },
      header: {
        height: alturaEncabezado,
        contents: await tools.encabezadoHtml(),
      },
      footer: {
        height: '1.5cm',
        contents: tools.piepaginaHtml(),
      },
    };

    const base64 = await tools.Generarpdfhtml(htmlCompleto, options);
    return base64;

  } catch (error) {
    console.error('Error generando PDF del acta de entrega:', error);
    return 'ERROR';
  }

}
