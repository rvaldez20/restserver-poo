const path = require('path');
const { response } = require("express");


const cargarArchivo = (req, res = response) => {

   if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
      res.status(400).json({ msg: 'No hay archivos que subir'});
      return;
   }
   
   const { archivo } = req.files;

   uploadPath = path.join( __dirname, '../uploads/', archivo.name );

   archivo.mv(uploadPath, (err) => {
      if (err) {
         console.log(err);
         return res.status(500).json({err});
      }

      res.json({ msag: 'File uploaded to ' + uploadPath });
  });
}


module.exports = {
   cargarArchivo
}