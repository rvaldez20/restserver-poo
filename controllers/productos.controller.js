const { request, response } = require('express');
const mongoose = require('mongoose');
const { Producto } = require('../models');


// obtener todos los produectos
const obtenerProductos = async(req, res=response) => {
   // obtener los productos en base a los parametros para el paginado
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
   const [total, productos] = await Promise.all([
      Producto.countDocuments( query ),
      Producto.find( query )
      .skip(Number(desde))
      .limit(Number(limite))
      .populate('usuario', ['nombre', 'correo'])
      .populate('categoria', 'nombre')
   ]);

      // devolver la respuesta
   res.status(201).json({
      total,
      productos
   });
}


// obtener un solo produecto
const obtenerProducto = async(req, res=response) => {
   // obtenemos el ID de los parametros de la url
   const { id } = req.params;

   const producto = await Producto.findById( id )
     .populate('usuario', ['nombre', 'correo']).populate('categoria', 'nombre');
   
   res.status(201).json(producto);
}


// crear un produecto
const crearProducto = async(req=request, res=response) => {

   const { precio, descripcion} = req.body;
   const nombre = req.body.nombre.toUpperCase();
   let usuario = req.usuarioAuth._id;
   let categoria = mongoose.Types.ObjectId('60b0354c4df86e2380a06821');

   // verificamos si existe el producto
    const productoDB = await Producto.findOne({nombre});
    if( productoDB ) {
       return res.status(400).json({
          msg: `El Producto ${productoDB.nombre}, ya existe`
       });
    }
 
   // generamos la data que se va guardar
   const data = {
      nombre,
      usuario,
      precio,
      categoria,
      descripcion
   }

   // console.log(data);
 
   // se graba la nueva categoria en la DB
    const producto = new Producto( data );
    await producto.save();
    
   res.status(201).json({
      producto
   });
}


// editar un produecto
const actualizarProducto = async(req, res=response) => {
   // obtenemos el id d elos paramas y el body
   const { id } = req.params;
   const { estado, usuario, ...data} = req.body
   data.nombre = data.nombre.toUpperCase();
   data.usuario = req.usuarioAuth._id;
   data.categoria = mongoose.Types.ObjectId('60b0354c4df86e2380a06821');

   const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

   res.status(201).json(producto);
}


// eliminar un produecto
const eliminarProducto = async(req, res=response) => {
   res.send('Eliminar un producto')
}




module.exports = {
   obtenerProductos,
   obtenerProducto,
   crearProducto,
   actualizarProducto,
   eliminarProducto
}