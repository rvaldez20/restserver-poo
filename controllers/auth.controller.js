const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


// función para las accines del login
const login = async(req=request, res=response) => {

   const { correo, password } = req.body;

   try {

      // Acciones a considerar para la validacion
      // (1) verificar si el email
      const usuario = await Usuario.findOne({ correo });
      if(!usuario) {
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
         });
      }

      // (2) verificar si el usuario esta activo
      if(usuario.estado === false) {
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
         });
      }

      // (3) si existe email, verificar si el password es correcto
      // bcryptjs.compareSync compara el passwor que s emanda oontra el guadaddo en la db
      const passwordValido = bcryptjs.compareSync(password, usuario.password);
      if(!passwordValido){
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
         });
      }

      // (4) generar el JWT
      const token = await generarJWT( usuario.id );
  

      res.json({
         usuario,
         token
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Algo salio mal, reportalo al administrador'
      })
   }   
}


const googleSignIn = async (req=request, res=response) => {

   const { id_token } = req.body;

   try {
   // ejecutamos la verificacion del id_token de google
   const googleUser = await googleVerify( id_token );
   console.log(googleUser);

      res.json({         
         msg: 'Todo OK! google signin',
         googleUser
      });
      
   } catch (error) {
      console.log(error);
      res.status(400).json({
         msg: 'Token de Google no es valido'
      })
   }


}




module.exports = {
   login,
   googleSignIn
}