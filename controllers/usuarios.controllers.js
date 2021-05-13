const { response, request } = require('express');


const usuariosGet = (req=request, res=response) => {

   /*
      Si no se manda un parametro query pero se quiere recibir se le puede asignar un 
      valor por defecto.


   */

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

const usuariosPost = (req , res = response) => {

   const { nombre, edad } = req.body;

   res.json({
      msg: 'post API - Usuarios POST',
      nombre,
      edad
   })
}

const usuariosPut = (req = request, res = response) => {

   // const id = req.params.id;
   const {id} = req.params;   

   res.status(400).json({
      msg: 'put API - Usuarios PUT',
      id
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