const { Pool } = require('pg');
const { execCentralizadaProcedimientos } = require('../../config/execSQLCentralizada.helper.js');
const crypto = require('crypto');
const CONFIGCENTRALIZADA = require('../../config/databaseCentral.js');
const ENCRYPTION_KEY = 'abcdefghijklmnopqrstuvwx01234567'; 
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; 
const bcrypt = require('bcrypt');

module.exports.ValidarCredenciales = async function (nombreUsuario, password) {
  const sentencia = 'SELECT * FROM seguridad.f_central_tb_usuario($1, $2, $3, $4, $5, $6, $7,$8)';
  const listaParametros = ['EDU', null, nombreUsuario, null, null, null, null,null];
  try {
   const resp = await execCentralizadaProcedimientos(sentencia, listaParametros, "OK", "OK");

    if (resp && resp.data && resp.data.length > 0) {
      const usuario = resp.data[0];
      const isMatch = await bcrypt.compare(password, usuario.ouusuario_strclave);


      if (isMatch) {
        return {
          success: true,
          idUsuario: usuario.ouidusuario,
          mensaje: 'Credenciales Válidas'
        };
      } else {
        return { success: false, mensaje: 'Contraseña incorrecta' };
      }
    } else {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }
  } catch (error) {
    return { success: false, mensaje: "Error: " + error.message };
  }
};



module.exports.EncriptarToken = async function (text) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH); 
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag().toString('hex'); 
    const encryptedToken = iv.toString('hex') + ':' + tag + ':' + encrypted; 

    return {
      success: true,
      encryptedToken: encryptedToken
    };
  } catch (error) {
    return {
      success: false,
      mensaje: "Error en encriptación: " + error.message
    };
  }
};

module.exports.DesencriptarToken = async function (text) {
  try {
    const [ivHex, tagHex, encryptedText] = text.split(':');
    if (!ivHex || !tagHex || !encryptedText) throw new Error("Formato de token inválido");

    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    decipher.setAuthTag(tag); // Agrega el tag de autenticación

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return {
      success: true,
      decryptedToken: decrypted
    };
  } catch (error) {
    return {
      success: false,
      mensaje: "Error en desencriptación: " + error.message
    };
  }
};
