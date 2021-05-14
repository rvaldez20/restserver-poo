const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios.controllers');


// routes para usuarios
router.get('/', usuariosGet);


router.post('/', [
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'El password debe ser de más de 6 caracteres').isLength({min: 6}),
	check('correo', 'El correo no es valido').isEmail(),
	// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	check('correo').custom( emailExiste ),
	// Seria lo mismo que ponerlo asi (rol) => esRoleValido(rol) , porque es el mismo parametro
	check('rol').custom( esRoleValido ),
	validarCampos
], usuariosPost);


router.put('/:id', usuariosPut);


router.delete('/', usuariosDelete);


router.patch('/', usuariosPatch);



module.exports = router;