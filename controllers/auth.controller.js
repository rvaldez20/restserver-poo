const { response, request } = require('express');


// función para las accines del login
const login = (req=request, res=response) => {

   

   res.json({
      msg: 'Login OK'
   });
}




module.exports = {
   login
}