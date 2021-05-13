const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');


class Server {

   constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosRoutePath = '/api/usuarios';

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

      this.app.use(this.usuariosRoutePath, require('../routes/usuarios.routes') );
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log(`App listening at http://localhost:${this.port}`)
      })
   }

}

module.exports = Server;