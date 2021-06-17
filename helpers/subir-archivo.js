const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

   return new Promise( (resolve, reject) => {

      const { archivo } = files;
      const nombreCortado = archivo.name.split('.');
      const extension = nombreCortado[ nombreCortado.length - 1 ]; 
      
      // validarlo contra las extensione s validas     
      if( !extensionesValidas.includes( extension ) ) {
         return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);

         // return res.status(400).json({
         //    msg: `La extensión ${extension} no es permitida, ${extensionesValidas}`
         // })
      }   
   
      // const nombreTeporal = uuidv4() + '.' + extension;
      const nombreTeporal = `${uuidv4()}.${extension}`;
      const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTeporal );
   
      archivo.mv(uploadPath, (err) => {         
         if (err) {
            reject(err);
         }
   
         resolve(nombreTeporal);
      });
   });
}


module.exports = {
   subirArchivo
}