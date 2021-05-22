
const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

// se usa le ... ()spread Operatior) para pasar todo lo que exportan
module.exports = {
   ...validaCampos,
   ...validaJWT,
   ...validaRoles
}