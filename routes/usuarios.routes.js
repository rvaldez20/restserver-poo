const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios.controllers');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');

// routes para usuarios
router.get('/', usuariosGet);

router.post('/', [
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'El password debe ser de más de 6 caracteres').isLength({min: 6}),
	check('correo', 'El correo no es valido').isEmail(),
	check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;