const { request, response } = require("express")



const esAdminRole = (req=request, res=response, next) => {

   // si no hay usuario en la request
   if( !req.usuarioAuth ){
      return res.status(500).json({
         msg: 'Se quiere validar el role sin validar el token'
      });
   }

   // estraemos d ela req.usuario la info del usuario
   const { rol, nombre } = req.usuarioAuth;

   if( rol !== 'ADMIN_ROLE'){
      return res.status(401).json({
         msg: `El ${ nombre } no es administrador - No tiene autorización`
      })
   }
   
   next();
}

// va recibir todos los argumento y lo sva convertir en un arreglo
const tieneRole = ( ...roles ) => {
   
   return (req=request, res=response, next) => {
      // console.log(roles, req.usuarioAuth.rol);


      // si no hay usuarioAunt en la request
      if( !req.usuarioAuth ){
         return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token'
         });
      }

      if( !roles.includes( req.usuarioAuth.rol ) ) {
         return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${ roles }`
         })
      }


      next();
   }
   
}



module.exports = {
   esAdminRole,
   tieneRole
}