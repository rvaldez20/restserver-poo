const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
// const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



// routes para auth
router.post('/login', login);



module.exports = router;