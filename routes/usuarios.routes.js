const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
	usuariosPost, 
	usuariosPut,
	usuariosDelete } = require('../controllers/usuarios.controllers');        
	
const router = Router();

// routes para usuarios
router.get('/', usuariosGet);


router.post('/', [
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'La contraseña debe ser de más de 6 caracteres').isLength({min: 6}),
	check('correo', 'El correo no es valido').isEmail(),
	// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	check('correo').custom( emailExiste ),
	// Seria lo mismo que ponerlo asi (rol) => esRoleValido(rol) , porque es el mismo parametro
	check('rol').custom( esRoleValido ),
	validarCampos
], usuariosPost);


router.put('/:id', [
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom( existeUsuarioPorId ),
	check('rol').custom( esRoleValido ),
	validarCampos
], usuariosPut);


router.delete('/:id', [
	validarJWT,
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom( existeUsuarioPorId ),
	validarCampos
], usuariosDelete);


// router.patch('/', usuariosPatch);



module.exports = router;