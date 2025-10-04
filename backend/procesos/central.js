const { iniciarTransaccion, commitTransaccion, rollbackTransaccion } = require('./transacciones');
const modelocentral = require('../modelo/persona/central');
const modelodatosorganizacion = require('../modelo/datosorganizacion');


module.exports.guardarPersonaConFoto = async function (objPersona) {
    const client = await iniciarTransaccion();

    try {
        // Inserta la persona usando el modelo
        const personaResp = await modelocentral.IngresarPersona(client, objPersona);
        if (!personaResp || personaResp.count === 0) {
            throw new Error("Error al insertar la persona");
        }

        const idPersona = personaResp.data[0].ouidempresa;

        // Inserta la foto de la persona usando el modelo
        const fotoResp = await modelocentral.InsertarPersonaFoto(client, idPersona, objPersona.strFoto);
        if (!fotoResp || fotoResp.count === 0) {
            throw new Error("Error al insertar la foto de la persona");
        }

        // Confirma la transacción
        await commitTransaccion(client);

        return {
            success: true,
            persona: personaResp.data,
            foto: fotoResp.data
        };
    } catch (error) {
        // Realiza rollback si algo falla
        await rollbackTransaccion(client);
        console.error("Error en la transacción:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports.IngresarPersonaPersonal = async function (objPersonal) {
    const client = await iniciarTransaccion();

    try {
        let cedula = objPersonal.documento || null;
        
        const personaExistente = await modelocentral.EncontrarPersonaDadoCedula(cedula);

        if (personaExistente && personaExistente.data && personaExistente.data.length > 0) {
            // La persona ya existe en la base de datos, se asigna su ID
            objPersonal.idpersona = personaExistente.data[0].idpersona;
        } else if (!objPersonal.idpersona || objPersonal.idpersona === -1) {
            // La persona no existe o no tiene un ID, por lo que se procede a registrarla
            const personaResp = await modelocentral.IngresarPersona(client, objPersonal);
        
            if (!personaResp || !personaResp.data || personaResp.data.length === 0) {
                throw new Error("Error al registrar la persona.");
            }
            objPersonal.idpersona = personaResp.data[0].ouidpersona;
        } else {
            // Si no se cumple ninguna de las condiciones anteriores, algo está mal
            throw new Error("No se pudo determinar si la persona existe o no.");
        }
            
        const personalRespon = await modelodatosorganizacion.InsertarPersonalBar(client,objPersonal);
        idPersonal = personalRespon.data[0].ouidpersonal;
        if (!personalRespon || !personalRespon.count) {
            throw new Error("Error al insertar personal.");
        }

        // Confirmar la transacción
        await commitTransaccion(client);

        return {
            success: true,
            datos: {
                idPersona: objPersonal.idpersona,  // Se asegura que `idPersona` esté dentro de `datos`
                idPersonal: idPersonal // Ahora devuelve correctamente `idPersonal`
            }   
        };
    } catch (error) {
        // Realizar rollback si hay errores
          // Rollback en caso de error
          await rollbackTransaccion(client);
          console.error("Error en la transacción:", error.message);
  
          return {
              success: false,
              mensaje: `Error: ${error.message}`,
              datos: []
          };
    }
};

module.exports.ActualizarPersonaPersonal = async function (objPersonal) {
    const client = await iniciarTransaccion();

    try {
        
        const personaResp = await modelocentral.ActualizarPersona(objPersonal);
        if (!personaResp || personaResp.count === 0) {
            throw new Error("Error al actualizar la persona");
        }

        const personalRespon = await modelodatosorganizacion.ActualizarPersonalBar(objPersonal);
        if (!personalRespon || personalRespon.count === 0) {
            throw new Error("Error al actualizar personal.");
        }

        // Confirma la transacción
        await commitTransaccion(client);

        return {
            success: true,
            persona: personaResp.data,
        };
    } catch (error) {
        // Realiza rollback si algo falla
        await rollbackTransaccion(client);
        console.error("Error en la transacción:", error);
        return {
            success: false,
            error: error.message
        };
    }
};