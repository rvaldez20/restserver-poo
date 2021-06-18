const { response, request } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req, res = response) => {

   // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
   //    return res.status(400).json({ msg: 'No hay archivos que subir'});      
   // }

   try {

      // imagenes
      // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
      const nombre = await subirArchivo( req.files, undefined, 'imgs' );
      res.json({
         nombre
      });      
   } catch (error) {
      res.status(400).json({msg: error})
   }
}



const actualizarImagen = async (req = request, res = response) => {

   // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
   //    return res.status(400).json({ msg: 'No hay archivos que subir'});      
   // }
   
   const { id, coleccion } = req.params;
   let modelo;

   switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById( id );
         if ( !modelo ){
            return res.status(400).json({
               msg: `No existe un usuario con ese ID ${id}`
            })
         }
         
         break;

      case 'productos':
         modelo = await Producto.findById( id );
         if ( !modelo ){
            return res.status(400).json({
               msg: `No existe un producto con ese ID ${id}`
            })
         }
         
         break;
   
      default:
         return res.status(500).json({msg: 'Se me olvido validar esto'})
   }

   const nombre = await subirArchivo( req.files, undefined, coleccion );
   modelo.imagen = nombre;
   await modelo.save()

   res.json({
      modelo
   })

}


module.exports = {
   cargarArchivo,
   actualizarImagen
}