const Server = require('./models/server');
require('dotenv').config();

// instanciamos la clase Server
const server = new Server();

// Ejecutamos el metodo listen
server.listen();