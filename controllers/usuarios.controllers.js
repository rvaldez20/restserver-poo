const { response, request } = require('express');


const usuariosGet = (req, res = response) => {
   res.json({
      msg: 'get API - Usuarios GET'
   })
}

const usuariosPost = (req , res = response) => {

   const { nombre, edad } = req.body;

   res.json({
      msg: 'post API - Usuarios POST',
      nombre,
      edad
   })
}

const usuariosPut = (req = request, res = response) => {
   res.status(400).json({
      msg: 'put API - Usuarios PUT'
   })
}

const usuariosDelete = (req = request, res = response) => {
   res.json({
      msg: 'delete API - Usuarios DELETE'
   })
}

const usuariosPatch = (req, res = response) => {
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