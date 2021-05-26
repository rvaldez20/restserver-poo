const { request, response } = require('express');
const { Categoria } = require('../models');


// obtenerCategoria - paginado - total - populate
const obtenerCategoria = async(req=request, res=response) => {

   // obtener las categorias en base a los parametros para el paginado
   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true };

   // se obtiene las categorias
   // const categorias = await Categoria.find( query )
   //    .skip(Number(desde))
   //    .limit(Number(limite))
   //    .populate('usuario');

   // se obtiene el total
   // const total = await Categoria.countDocuments( query );

   // optimización de los 2 awaits
   const [total, categorias] = await Promise.all([
      Categoria.countDocuments( query ),
      Categoria.find( query )
      .skip(Number(desde))
      .limit(Number(limite))
      .populate('usuario')
   ]);

      // devolver la respuesta
   res.status(201).json({
      total,
      categorias
   });
}
 

// obtenerCategoria -populate {}
 

// Crea una nueva Categortia en la DB
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


// Actualizar la categoria


// Eliminar la categoria - estado a false

module.exports = {
   crearCategoria,
   obtenerCategoria
}