const { request, response } = require('express');
const { Categoria } = require('../models');


const crearCategoria = async(req=request, res=response) =>{
   
   // extraemos el nombre y lo convertimos a mayusculas
   const nombre = req.body.nombre.toUpperCase();
   console.log(nombre);
   
   // verificamos si existe una categoria
   const categoriaDB = await Categoria.findOne({nombre});
   if( categoriaDB ) {
      return res.status(400).json({
         msg: `La categoria ${categoriaDB.nombre}, ya existe`
      });
   }

   // generamos la data que se va guardar
   const data = {
      nombre,
      usuario: req.usuarioAuth._id
   }

   // se graba la nueva categoria en la DB
   const categoria = new Categoria( data );
   await categoria.save();
   
   res.status(201).json(categoria);
}

module.exports = {
   crearCategoria
}