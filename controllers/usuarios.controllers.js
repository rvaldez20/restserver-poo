const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = async(req=request, res=response) => {
      
   // obtenemos el argumento query limit, si no se manda se pone pordefecto 5
   // .limit -> especifica el numero d eregistros
   // .skip  -> extra apartir de ese numero, 
   //           ejemplo si usamos .skip(5) nos trae del 6 en adelante, dependera si tenemos
   //           especificado el limit. Si el skip es mayor que el numero de registros
   //           retornara un array vacio
   // TODO: validar que limite y desde sean un Number
   const { limite = 5, desde = 0 } = req.query;
   const usuarios = await Usuario.find()
      .skip(Number(desde))
      .limit(Number(limite))

   res.json({
      usuarios
   })
}

const usuariosPost = async (req=request , res=response) => {
   // const { google, ...resto } = req.body;
   const { nombre, correo, password, rol } = req.body;
   const usuario = new Usuario({ nombre, correo, password, rol });

   // Las validaciones se hacen en usuarios.routes.js

   // encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync( password, salt );

   // Guardar en la db
   await usuario.save();

   res.json({      
      usuario
   });
}

const usuariosPut = async(req=request , res=response) => {

   // const id = req.params.id;
   const { id } = req.params;   
   const { _id, password, google, correo, ...resto } = req.body;

   // TODO: validar contra DB
   if( password ) {
      // encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
   }

   const usuario = await Usuario.findByIdAndUpdate( id, resto );

   res.status(400).json(usuario);
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