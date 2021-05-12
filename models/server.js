const express = require('express')


class Server {

   constructor() {
      this.app = express();
      this.port = process.env.PORT;


      // Middleware
      this.middlewares();
      
      // Routes de la aplicacion
      this.routes();
   }

   middlewares() {
      // directorio Público
      this.app.use( express.static('public') );
   }

   routes() {
      this.app.get('/api', (req, res) => {
         res.send('Hello World')
      })
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log(`App listening at http://localhost:${this.port}`)
      })
   }

}

module.exports = Server;