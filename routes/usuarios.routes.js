const { Router } = require('express');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios.controllers');
const router = Router();

// routes para usuarios
router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.put('/', usuariosPut);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);



module.exports = router;