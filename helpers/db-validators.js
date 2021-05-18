const Role = require('../models/role');
const Usuario = require('../models/usuario');

// funcion para validar el rol contra la base de datos
const esRoleValido = async (rol = '') => {
   const existeRol = await Role.findOne({rol});
   if(!existeRol){
      throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
   }
}

// Verificar si el correo existe
const emailExiste = async(correo = '') =>{
   const existeEmail = await Usuario.findOne({ correo });
   if( existeEmail ) {
      throw new Error(`El correo ${ correo } ya está registrado`);
   }
}

// Verificar si el id existe
const existeUsuarioPorId = async( id ) =>{
   const existeUsuario = await Usuario.findById(id);
   if( !existeUsuario ) {
      throw new Error(`El ID ${ id } no existe`);
   }
}



module.exports = {
   esRoleValido,
   emailExiste,
   existeUsuarioPorId
}