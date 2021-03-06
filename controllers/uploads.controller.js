const { response, request } = require("express");
const { subirArchivo } = require("../helpers");

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const  path = require('path');
const fs = require('fs');

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


// es para hacerlo en prueba con localhost
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

   // validaciones para eliminar archivos inecesarios (limpia imagenes previas)
   if (modelo.imagen) {
      // hay que borrar la imagen del servidor
      const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.imagen );
      if( fs.existsSync( pathImagen )) {
         fs.unlinkSync( pathImagen );
      }
   }


   const nombre = await subirArchivo( req.files, undefined, coleccion );
   modelo.imagen = nombre;
   await modelo.save()

   res.json({
      modelo
   })
}


// Es para guardar las imagene sen elservicio de cloudinary
const actualizarImagenCloudinary = async (req = request, res = response) => {
   
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

   // validaciones para eliminar archivos inecesarios (limpia imagenes previas)
   if (modelo.imagen) {
      // hay que borrar la imagen del servidor  
      // Primero extrar el name qu ele asino cloudinary del secure_url
      const nombreArr = modelo.imagen.split('/');      
      const nombreConExtension = nombreArr[ nombreArr.length - 1 ];

      // SOLUCION con substring
      // const public_id = nombreConExtension.substring(0, nombreArr[7].length-4);

      // SOLUCION con destructuracion y split
      const [ public_id ] = nombreConExtension.split('.');
      
      // PARA TEST
      // console.log(nombreArr[7]);
      // console.log(public_id);

      // Eliminamos imagen- se puede quitar el await pq no necesitamos espera que la borre
      cloudinary.uploader.destroy( public_id );      
   }

   // console.log(req.files.archivo);
   const { tempFilePath } = req.files.archivo;
   const resp = await cloudinary.uploader.upload( tempFilePath );
   const { secure_url } = resp;
   
   modelo.imagen = secure_url;
   await modelo.save()

   res.json({
      modelo
   })
}



const mostrarImagen = async (req, res = response) => {
   
   const { id, coleccion } = req.params;
   let modelo;

   switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById( id );
         if ( !modelo ){
            return res.status(400).json({
               msg: `No existe un usuario con ese ID ${id}`
            });            
         }
         
         break;

      case 'productos':
         modelo = await Producto.findById( id );
         if ( !modelo ){
            return res.status(400).json({
               msg: `No existe un producto con ese ID ${id}`
            });          
         }
         
         break;
   
      default:
         return res.status(500).json({msg: 'Se me olvido validar esto'})
   }

   // validaciones para eliminar archivos inecesarios (limpia imagenes previas)
   if (modelo.imagen) {
      // hay que borrar la imagen del servidor
      const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.imagen );
      if( fs.existsSync( pathImagen )) {
         return res.sendFile( pathImagen );
      }
   } 
  
   const pathPlaceHolder = path.join( __dirname, '../assets/no-image.jpg' );
   res.sendFile( pathPlaceHolder );
}


module.exports = {
   cargarArchivo,
   actualizarImagen,
   mostrarImagen,
   actualizarImagenCloudinary
}