const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');


class Server {

   constructor() {
      this.app = express();
      this.port = process.env.PORT;

      this.paths = {
         auth: '/api/auth',
         buscar: '/api/buscar',
         usuarios: '/api/usuarios',
         categorias: '/api/categorias',
         productos: '/api/productos',
         uploads: '/api/uploads'
      }
      // this.usuariosRoutePath = '/api/usuarios';
      // this.authRoutePath = '/api/auth';
      

      // concexion a la db
      this.conectarDB();


      // Middleware
      this.middlewares();
      
      // Routes de la aplicacion
      this.routes();
   }

   async conectarDB() {
      await dbConnection();
   }

   middlewares() {
      // CORS
      this.app.use( cors() );

      // Parseo y lectura del body d ela solicitid http
      this.app.use( express.json() );

      // directorio Público
      this.app.use( express.static('public') );
   }

   routes() {

      this.app.use(this.paths.auth, require('../routes/auth.routes') );
      this.app.use(this.paths.usuarios, require('../routes/usuarios.routes') );
      this.app.use(this.paths.categorias, require('../routes/categorias.routes') );
      this.app.use(this.paths.productos, require('../routes/productos.routes') );
      this.app.use(this.paths.buscar, require('../routes/buscar.routes') );
      this.app.use(this.paths.uploads, require('../routes/uploads.routes') );
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log(`App listening at http://localhost:${this.port}`)
      })
   }

}

module.exports = Server;