const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias.controller');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - Publico
router.get('/', (req, res) =>{
   res.json('GET')
});


// Obtener una categoria por ID - Publico
router.get('/:id', (req, res) =>{
   res.json('GET -ID')
});


// Crear categoria por ID - Privado - Cualquier persona con un token valido
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria);


// Actualizar categoria por ID - Privado - Cualquier persona con un token valido
router.put('/:id', (req, res) =>{
   res.json('PUT')
});


// Borrar (logica) categoria por ID - soolo ADMIN - Cualquier persona con un token valido
router.delete('/:id', (req, res) =>{
   res.json('DELETE (logico)')
});


module.exports = router;