const { response } = require("express");


const cargarArchivo = (req, res = response) => {

   res.json({msg: 'Upload......'})

}


module.exports = {
   cargarArchivo
}