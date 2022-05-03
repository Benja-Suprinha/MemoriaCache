var express = require('express');
var router = express.Router();
const client = require('../clientgRPC')

router.get('/list', function(req, res){
    const rows = [];
    const call = client.ListarCasos();
    call.on('data', function(data){
        rows.push(data)
    });
    call.on('end', function(){
        console.log("Data obtenida con exito");
        res.send(rows);
    });
    call.on('error', function(e){
        console.log("Error al obtener los datos")
    });
});

module.exports = router;