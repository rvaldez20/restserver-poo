const { Router, response } = require('express');
const { check } = require('express-validator');

const { 
   obtenerProductos,
   obtenerProducto,
   crearProducto,
   actualizarProducto,
   eliminarProducto
} = require('../controllers/productos.controller');

const { existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const router = Router();



// Obtener todos los productos
router.get('/', obtenerProductos);


// Obtener un solo producto por ID
router.get('/:id', obtenerProducto);


// crear un producto
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearProducto);


// Actualizar un producto
router.put('/:id', actualizarProducto);


// Borrear un producto
router.delete('/:id', eliminarProducto);



module.exports = router;