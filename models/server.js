const express = require('express')
const cors = require('cors');


class Server {

   constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosRoutePath = '/api/usuarios';


      // Middleware
      this.middlewares();
      
      // Routes de la aplicacion
      this.routes();
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