const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = (req=request, res=response) => {
   
   // const query = req.query;
   const { q, nombre='No Name', apikey, page=1, limit } = req.query;

   res.json({
      msg: 'get API - Usuarios GET',
      q,
      nombre,
      apikey,
      page, 
      limit
   })
}

const usuariosPost = async (req=request , res=response) => {
   // const { google, ...resto } = req.body;
   const { nombre, correo, password, rol } = req.body;
   const usuario = new Usuario({ nombre, correo, password, rol });

   // VALIDADCIONES
   // Verificar si el correo existe
   const existeEmail = await Usuario.findOne({ correo });
   if( existeEmail ) {
      return res.status(400).json({
         msg: 'Ese correo ya esta registrado'
      })
   }

   // encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync( password, salt );

   // Guardar en la db
   await usuario.save();

   res.json({      
      usuario
   });
}

const usuariosPut = (req=request , res=response) => {

   // const id = req.params.id;
   const {id} = req.params;   

   res.status(400).json({
      msg: 'put API - Usuarios PUT',
      id
   })
}

const usuariosDelete = (req=request , res=response) => {
   res.json({
      msg: 'delete API - Usuarios DELETE'
   })
}

const usuariosPatch = (req=request , res=response) => {
   res.json({
      msg: 'patch API - Usuarios PATCH'
   })
}

module.exports = {
   usuariosGet,
   usuariosPost,
   usuariosPut,
   usuariosDelete,
   usuariosPatch
}