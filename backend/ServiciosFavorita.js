const express = require('express');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

// Rutas autenticacion
const rutarol = require('./rutas/autenticacion/rutarol');
const rutausuario = require('./rutas/autenticacion/rutausuario');
const rutalogin = require('./rutas/autenticacion/rutalogin');
const rutaperfil = require('./rutas/autenticacion/rutaperfil');
const rutarecuperarpassword = require('./rutas/autenticacion/rutarecuperarpassword');

//Rutas catalogos
const rutatipoconvenio = require('./rutas/catalogos/rutatipoconvenio');
const rutatipodonante = require('./rutas/catalogos/rutatipodonante');
const rutatipoempresa = require('./rutas/catalogos/rutatipoempresa');
const rutatiposolicitud = require('./rutas/catalogos/rutatiposolicitud');
const rutacargo = require('./rutas/catalogos/rutacargo');


//Rutas compartido
const rutaenviarcorreo = require('./rutas/compartido/rutaenviarcorreo');
const rutamensajesolicitud = require('./rutas/compartido/rutamensajesolicitud');
const rutaubicacion = require('./rutas/compartido/rutaubicacion');
const rutadatosorganizacion = require('./rutas/rutadatosorganizacion');

//Rutas Convenio
const rutaclausula = require('./rutas/convenio/rutaclausula');
const rutacontrato = require('./rutas/convenio/rutacontrato');
const rutaconvenio = require('./rutas/convenio/rutaconvenio');
const rutaitem = require('./rutas/convenio/rutaitem');
const rutasubclausula = require('./rutas/convenio/rutasubclausula');

//Rutas empresa
const rutaempresa = require('./rutas/empresa/rutaempresa');

//Rutas persona
const rutapersonas = require('./rutas/persona/rutacentralpersona');



const cors = require('cors');
const app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');

const port = 3001;
const url = '/backend'

//Cors Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/*const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutos
    max: 100, // Número máximo de solicitudes por IP
    message: 'Demasiadas solicitudes. Intente nuevamente más tarde.',
});


app.use(limiter);
*/

//Rutas de Servicios Web
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));//

// Rutas autenticación
app.use(url + '/rutarol', rutarol);
app.use(url + '/rutausuario', rutausuario);
app.use(url + '/rutalogin', rutalogin);
app.use(url + '/rutaperfil', rutaperfil);
app.use(url + '/rutarecuperarpassword', rutarecuperarpassword);


// Rutas catálogos
app.use(url + '/rutatipoconvenio', rutatipoconvenio);

app.use(url + '/rutatipoempresa', rutatipoempresa);
app.use(url + '/rutacargos', rutacargo);

// Rutas compartido
app.use(url + '/rutaenviarcorreo', rutaenviarcorreo);
app.use(url + '/rutamensajesolicitud', rutamensajesolicitud);
app.use(url + '/rutaubicacion', rutaubicacion);
app.use(url + '/rutadatosorganizacion', rutadatosorganizacion);

// Rutas convenio
app.use(url + '/rutaclausula', rutaclausula);
app.use(url + '/rutacontrato', rutacontrato);
app.use(url + '/rutaconvenio', rutaconvenio);
app.use(url + '/rutaitem', rutaitem);
app.use(url + '/rutasubclausula', rutasubclausula);


// Rutas empresa
app.use(url + '/rutaempresa', rutaempresa);

// Rutas persona
app.use(url + '/rutapersonas', rutapersonas);


/*MIDLEWARES*/
app.use(express.json({ limit: '50mb' }));//convierte en objeto js 
app.use(express.urlencoded({ extended: false }));//procesa datos de formularios(en otros modulos extended true)

http.createServer(app.listen(port, () => {
    console.log("Servicios Fundacion Favorita ejecutado con exito: ", port)
}))