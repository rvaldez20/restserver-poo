const { response } = require('express');


const usuariosGet = (req, res) => {
   res.json({
      msg: 'get API - Usuarios GET'
   })
}

const usuariosPost = (req, res) => {
   res.status(201).json({
      msg: 'post API - Usuarios POST'
   })
}

const usuariosPut = (req, res = response) => {
   res.status(400).json({
      msg: 'put API - Usuarios PUT'
   })
}

const usuariosDelete = (req, res) => {
   res.json({
      msg: 'delete API - Usuarios DELETE'
   })
}

const usuariosPatch = (req, res) => {
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