
const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
   'usuarios',
   'categorias',
   'productos',
   'roles'
];

// Para busquedas en la colleccion de usuarios
const buscarUsuarios = async ( termino = '', res = response ) => {
   const esMongoId = ObjectId.isValid( termino );  // Si es un ID de mongo retorna TRUE   
   if ( esMongoId ) {
      const usuario = await Usuario.findById( termino );
      return res.json({
         results: ( usuario ) ? [ usuario ] : []
      });
   }

   const regex = new RegExp( termino, 'i' );
   // se utiliza un or en el find para buscar por nombre o correo
   const usuarios = await Usuario.find({ 
      $or: [{ nombre: regex }, { correo: regex }],
      $and: [{ estado: true }]
    });
   return res.json({
      results: usuarios
   });
}


// Para busquedas en la colleccion categorias
const buscarCategorias = async ( termino = '', res=response ) => {
   const esMongoId = ObjectId.isValid( termino );  // Si es un ID de mongo retorna TRUE   
   if ( esMongoId ) {
      const categoria = await Categoria.findById( termino );
      return res.json({
         results: ( categoria ) ? [ categoria ] : []
      });
   }

   const regex = new RegExp( termino, 'i' );
   const categoria = await Categoria.find({ nombre: regex, estado: true });  
    
   return res.json({
      results: categoria
   });
}


// Para busquedas en la colleccion productos
const buscarProductos = async ( termino = '', res=response ) => {
   const esMongoId = ObjectId.isValid( termino );  // Si es un ID de mongo retorna TRUE   
   if ( esMongoId ) {
      const productos = await Producto.findById( termino )
                                 .populate('categoria', 'nombre');
      return res.json({
         results: ( productos ) ? [ productos ] : []
      });
   }

   const regex = new RegExp( termino, 'i' );
   const productos = await Producto.find({ nombre: regex })
                              .populate('categoria', 'nombre');
    
   return res.json({
      results: productos
   });
}


const buscar = (req = request, res = response ) => {
   // obtenemos los parametros
   const { coleccion, termino } = req.params;

   // Primero validamos que el parametro soleccion sera una el nombre d euna coleccion valida
   if( !coleccionesPermitidas.includes( coleccion )) {
      return res.status(400).json({
         msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
      })
   }

   switch (coleccion) {
      case 'usuarios':
            buscarUsuarios(termino, res);
         break;
      case 'categorias':
            buscarCategorias(termino, res);
         break;
      case 'productos':
          buscarProductos(termino, res);
         break;
      // case 'roles':
         
      //    break;
   
      default:
         res.status(500).json({
            msg: 'Se me olvido hacer esta busqueda'
         })
         break;
   }

   // res.json ({
   //    msg: 'Buscar.....',
   //    coleccion,
   //    termino
   // });

}


module.exports = {
   buscar
}