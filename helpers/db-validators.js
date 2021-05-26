const { Role, Usuario, Categoria } = require('../models');

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

// Verificar si el id del usuario existe
const existeUsuarioPorId = async( id ) =>{
   const existeUsuario = await Usuario.findById(id);
   if( !existeUsuario ) {
      throw new Error(`El ID ${ id } del Usuraio no existe`);
   }
}

// Verificar si el id de la categoria existe
const existeCategoriaPorId = async( id ) =>{
   const existeCategoria = await Categoria.findById(id);
   if( !existeCategoria ) {
      throw new Error(`El ID ${ id } de la Categoria no existe`);
   }
}



module.exports = {
   esRoleValido,
   emailExiste,
   existeUsuarioPorId,
   existeCategoriaPorId
}