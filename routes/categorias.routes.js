const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria ,
        actualizarCategoria,
        eliminarCategoria
      } = require('../controllers/categorias.controller');

const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - Publico
router.get('/', obtenerCategorias);


// Obtener solo una categoria por ID - Publico
router.get('/:id', [
   check('id', 'No es un ID Categoria valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),
   validarCampos
], obtenerCategoria);


// Crear categoria por ID - Privado - Cualquier persona con un token valido
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria);


// Actualizar categoria por ID - Privado - Cualquier persona con un token valido
router.put('/:id', [
   validarJWT,
   check('id','No es un ID Categoria valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos   
], actualizarCategoria);


// Borrar (logica) categoria por ID - soolo ADMIN - Cualquier persona con un token valido
router.delete('/:id', [
   validarJWT,
   tieneRole('ADMIN_ROLE'),
   check('id','No es un ID Categoria valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),   
	validarCampos
], eliminarCategoria);


module.exports = router;