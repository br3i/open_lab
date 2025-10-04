const pathimage = require('path');
const fs = require("fs");
const moment = require('moment');
require('moment/locale/es');
const pdf = require('html-pdf');
const modelodatosorganizacion = require('./../modelo/datosorganizacion')



function imageToBase64(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  return Buffer.from(imageData).toString('base64');
}

function FechaActual() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  const currentDate = new Date().toLocaleDateString();
  return currentDate;
}

// Función para calcular la altura del encabezado basado en el contenido
function calcularAlturaEncabezado(contenidoEncabezado) {
  // Si el contenido es nulo o vacío, asigna un valor por defecto
  if (!contenidoEncabezado || contenidoEncabezado.trim() === "") {
    return "4.5cm";
  }

  const lineasDeTexto = contenidoEncabezado.split('\n').length; // Número de líneas en el encabezado

  // Si solo hay 1 línea, asigna una altura fija de 2.5 cm
  if (lineasDeTexto === 18) {
    return "4.5cm";
  }

  const alturaPorLinea = 0.10; // Ajusta este valor según el tamaño de fuente (en cm)
  const alturaCalculada = lineasDeTexto * alturaPorLinea + 2.5;

  return `${alturaCalculada}cm`; // Retorna la altura en cm
}


//Encabezado con datos de la organización
module.exports.encabezadoOcultoHtml = async function () {
  const imagenheader = pathimage.join(__dirname, '../public/imagenes/logobar2.png');

  try {
    // Obtener los datos de la organización
    const datosOrganizacion = await modelodatosorganizacion.ListadoDatosOrganizacionActivos();

    // Generar el texto de contactos por defecto o basado en los datos
    const contactosHtml = (!datosOrganizacion || !datosOrganizacion.data || datosOrganizacion.data.length === 0)
      ? `<p style="margin: 0; font-size: 11px;">Riobamba - Kilómetro 1 ½ vía a Chambo - 032 626 182</p>` // Texto por defecto
      : datosOrganizacion.data.map(organizacion => `
              <p style="margin: 0; font-size: 11px;">
                  ${organizacion.organizacion_strnombre}: ${organizacion.organizacion_strdireccion} - ${organizacion.organizacion_strtelefono}
              </p>
          `).join('');

    // Asegurarse de que la imagen siempre esté presente
    const base64Image = imageToBase64(imagenheader);

    // Generar el encabezado completo
    const headerHtml2 = `
          <div style="width: 100%; background-color: #fff;  display: none;"> 
              <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                      <td style="text-align: left; vertical-align: middle; width: 50%; padding: 10px; border: 1px">
                          <img src="data:image/jpeg;base64,${base64Image}" 
                              alt="Header Image" 
                              style="width: 145px; height: auto; border: 1px; padding: 5px; border-radius: 4px;">
                      </td>
                      <td style="text-align: right; vertical-align: middle; width: 50%;">
                          ${contactosHtml}
                      </td>
                  </tr>
                  <tr>
                  <td colspan="2" style="height: 5px; background-color: #a8c263; padding: 0;"></td>
                  </tr>
                </table>
          </div>
      `;

    return headerHtml2;

  } catch (error) {
    console.error('Error obteniendo los datos de la organización o imagen:', error);

    // Manejar el caso en que ocurra un error
    const base64Image = imageToBase64(imagenheader); // Asegurarse de usar la imagen por defecto
    return `
          <div style="width: 100%; background-color: #fff;"> 
              <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                      <td style="text-align: left; vertical-align: middle; width: 50%; padding: 10px; border: 1px">
                          <img src="data:image/jpeg;base64,${base64Image}" 
                              alt="Header Image" 
                              style="width: 145px; height: auto; border: 1px; padding: 5px; border-radius: 4px;">
                      </td>
                      <td style="text-align: right; vertical-align: middle; width: 50%;">
                          <p style="margin: 0; font-size: 11px;">Error obteniendo datos de la organización.</p>
                      </td>
                  </tr>
                  <tr>
                  <td colspan="2" style="height: 5px; background-color: #a8c263; padding: 0;"></td>
                  </tr>
              </table>
          </div>
      `;
  }
};

module.exports.encabezadoHtml = async function () {
  const imagenheader = pathimage.join(__dirname, '../public/imagenes/logobar2.png');

  try {
    // Obtener los datos de la organización
    const datosOrganizacion = await modelodatosorganizacion.ListadoDatosOrganizacionActivos();

    // Generar el texto de contactos por defecto o basado en los datos
    const contactosHtml = (!datosOrganizacion || !datosOrganizacion.data || datosOrganizacion.data.length === 0)
      ? `<p style="margin: 0; font-size: 11px;">Riobamba - Kilómetro 1 ½ vía a Chambo - 032 626 182</p>` // Texto por defecto
      : datosOrganizacion.data.map(organizacion => `
                <p style="margin: 0; font-size: 11px;">
                    ${organizacion.organizacion_strnombre}: ${organizacion.organizacion_strdireccion} - ${organizacion.organizacion_strtelefono}
                </p>
            `).join('');

    // Asegurarse de que la imagen siempre esté presente
    const base64Image = imageToBase64(imagenheader);

    // Generar el encabezado completo
    const headerHtml2 = `
            <div style="width: 100%; background-color: #fff;"> 
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="text-align: left; vertical-align: middle; width: 50%; padding: 10px; border: 1px">
                            <img src="data:image/jpeg;base64,${base64Image}" 
                                alt="Header Image" 
                                style="width: 145px; height: auto; border: 1px; padding: 5px; border-radius: 4px;">
                        </td>
                        <td style="text-align: right; vertical-align: middle; width: 50%;">
                            ${contactosHtml}
                        </td>
                    </tr>
                    <tr>
                    <td colspan="2" style="height: 5px; background-color: #a8c263; padding: 0;"></td>
                    </tr>
                </table>
            </div>
        `;

    return headerHtml2;

  } catch (error) {
    console.error('Error obteniendo los datos de la organización o imagen:', error);

    // Manejar el caso en que ocurra un error
    const base64Image = imageToBase64(imagenheader); // Asegurarse de usar la imagen por defecto
    return `
            <div style="width: 100%; background-color: #fff;"> 
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="text-align: left; vertical-align: middle; width: 50%; padding: 10px; border: 1px">
                            <img src="data:image/jpeg;base64,${base64Image}" 
                                alt="Header Image" 
                                style="width: 145px; height: auto; border: 1px; padding: 5px; border-radius: 4px;">
                        </td>
                        <td style="text-align: right; vertical-align: middle; width: 50%;">
                            <p style="margin: 0; font-size: 11px;">Error obteniendo datos de la organización.</p>
                        </td>
                    </tr>
                    <tr>
                    <td colspan="2" style="height: 5px; background-color: #a8c263; padding: 0;"></td>
                    </tr>
                </table>
            </div>
        `;
  }
};


module.exports.piepaginaHtml = function () {
  var imagenfooter = pathimage.join(__dirname, '../public/imagenes/logobar.png');
  const footerHtml = `<div style="text-align: center;">
        <img src="data:image/jpeg;base64,${imageToBase64(imagenfooter)}" alt="Footer Image" style="width: 300px;height: 30px">
        <p style='text-align: right;font-size: 10px;'>Fecha impresión : <strong>${FechaActual()} </strong> </p>
    
    </div> `;
  return footerHtml
}
module.exports.piepaginaOcultoHtml = function () {
  var imagenfooter = pathimage.join(__dirname, '../public/imagenes/logobar.png');
  const footerHtml2 = `<div style="text-align: center;display:none">
        <img src="data:image/jpeg;base64,${imageToBase64(imagenfooter)}" alt="Footer Image" style="width: 300px;height: 30px">
        <p style='text-align: right;font-size: 11px;'> Fecha impresión : <strong>${FechaActual()} </strong> </p>
       
    </div>`;
  return footerHtml2
}

module.exports.convertirfechaformato = function (fecha) {
  let day = fecha.getDate()
  let month = fecha.getMonth() + 1
  let year = fecha.getFullYear()
  var fecha = "";
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  var fechaformato = year + "-" + month + "-" + day
  return fechaformato
}

module.exports.ConvertirFormatoFecha = function (fechaStr) {
  // Parsear la cadena de fecha con moment.js
  const fecha = moment(fechaStr);

  // Obtener el nombre del día de la semana
  const nombreDiaSemana = fecha.format("dddd");

  // Obtener el día del mes
  const diaMes = fecha.format("DD");

  // Obtener el nombre del mes
  const nombreMes = fecha.format("MMMM");

  // Obtener el año
  const año = fecha.format("YYYY");

  // Obtener la hora y el minuto
  let hora = fecha.format("hh");
  const minuto = fecha.format("mm");

  // Obtener AM o PM
  const amPm = fecha.format("a");

  // Ajustar la hora si es necesario
  if (hora === '00') {
    hora = '12';
  }

  // Crear la cadena de fecha en el formato deseado
  const fechaFormateada = `${nombreDiaSemana} ${diaMes} de ${nombreMes} del ${año} hora ${hora}:${minuto}${amPm}`;

  return fechaFormateada;
}


module.exports.CalcularDiferenciaEnAniosYMeses = function (fechaInicio, fechaFin) {
    // Validar que las fechas estén definidas
    if (!fechaInicio || !fechaFin) {
        console.error("Una de las fechas no es válida:", fechaInicio, fechaFin);
        return { años: NaN, meses: NaN };
    }

    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);

    // Verificar si las fechas son válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Error al crear las fechas:", startDate, endDate);
        return { años: NaN, meses: NaN };
    }

    let años = endDate.getFullYear() - startDate.getFullYear();
    let meses = endDate.getMonth() - startDate.getMonth();

    // Ajustar si los meses son negativos
    if (meses < 0) {
        años--;
        meses += 12;
    }

    return { años, meses };
};

module.exports.Generarpdfhtml = function (htmlCompleto, options) {
  return new Promise((resolve, reject) => {
    pdf.create(htmlCompleto, options).toFile("reportes.pdf", function (err, res) {
      if (err) {
        reject(err);
      } else {
        fs.readFile(res.filename, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const base64Data = Buffer.from(data).toString('base64');
            fs.unlink(res.filename, (err) => {
              if (err) {
                console.error('Error al eliminar el archivo PDF:', err);
              } else {
                console.log('Archivo PDF eliminado.');
              }
            });

            // Resolver la promesa con base64Data
            resolve(base64Data);
          }
        });
      }
    });
  });
}

// Exportar la función para calcular la altura del encabezado
module.exports.calcularAlturaEncabezado = calcularAlturaEncabezado;

module.exports.FechaActual = FechaActual;