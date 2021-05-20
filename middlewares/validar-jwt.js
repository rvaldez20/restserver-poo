const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



const validarJWT = async( req=request, res=response, next ) => {

   const token = req.header('x-token');  
   // solo se valida si se envio el token en los header d ela petición
   if(!token){
      return res.status(401).json({
         msg: 'No hay Token en la petición'
      })
   }

   // console.log(token);
   
   // se valida el JWT
   try {
      // extraemos el uid del usurio - el jwt.verify nos retorna el payload
      const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
      const { uid } = payload;
      // console.log(uid);
      
      // obtenemos el usuario autenticado
      const usuarioAuth = await Usuario.findById( uid );

      // verificamos que usuarioAuth no sea undefined
      if( !usuarioAuth ){
         return res.status(401).json({
            msg: 'Token no valido - usuario no existente en DB'
         })
      }

      // verificamos si el uid tiene estado en true
      if( usuarioAuth.estado === false ) {
         return res.status(401).json({
            msg: 'Token no valido - usuario con estado: false'
         })
      }

      // establecemos el usuario en el request
      req.usuarioAuth = usuarioAuth

      // agregamos en la request el uid del usuario
      // req.uid = uid;
      
      next();

   } catch (error) {
      // si el token no e svalido se captura el arreo aqui en cath
      console.log(error);
      res.status(401).json({
         msg: 'Token no valido'
      })
   }
}


module.exports = {
   validarJWT
}