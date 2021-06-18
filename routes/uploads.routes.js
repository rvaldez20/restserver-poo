const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

// route para cargar un archivo
router.post('/', [
   validarArchivoSubir
], cargarArchivo);

// ruta para actualizar
router.put('/:coleccion/:id', [
   validarArchivoSubir,
   check('id', 'No es un ID de usuario valido (mongoId)').isMongoId(),
   check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
   validarCampos
], actualizarImagen);


module.exports = router;