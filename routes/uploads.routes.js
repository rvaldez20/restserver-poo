const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo } = require('../controllers/uploads.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// routes para auth
router.post('/', cargarArchivo);


module.exports = router;