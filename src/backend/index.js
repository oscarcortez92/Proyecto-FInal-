//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

const fs   = require ('fs');
const archivo = 'datos.json';
var express = require('express');
var app = express();
var utils = require('./mysql-connector');
var eventos = require ('events');

var eventEmitter = new eventos.EventEmitter();


var handlerConexion = function conexion(){
    console.log("Conexion Exitosa")
}
//cuando conexion se emita, sera controlado por handlerconexion
eventEmitter.on('conexion',handlerConexion); 
// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//requiere datos de datos.json lo guarda en variable datos
var datos = require('./datos.json');
const { Console } = require('console');
const { type } = require('os');
const { checkServerIdentity } = require('tls');


/*app.get('/devices', function(req, res) {

    devices = [

        {

            "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0
        }
        
    ]

    var datos = require('./datos.json');
    res.send(JSON.stringify(datos)).status(200);
    //res.send(datos);
    //res.json(datos);
});*/

  //Sacar info de tabla devices
  //para insertar valores poner ?,? donde queiras valores y dsps entre corchetes los valores []
app.get('/devices/', function(req, res) {
  
    utils.query("SELECT * from Devices",(err,rows)=>{
        if(err) throw err
        res.json(rows);
    });

})  
//Espera una consulta al endpoint EJ /devices/1
//Parámetro id = el id del dispositivo a buscar
// devuelve el dispositivo con el id que viene del parametro
app.get('/devices/:id', function(req, res) {
    
    utils.query("SELECT * from Devices WHERE id = ?",req.params.id,(err,rows)=>{
        if(err) throw err

        res.json(rows);
    });
});

app.post('/devices', function(req, res) {
    if(req.body.accion == "agregar"){
        utils.query("INSERT INTO Devices (id,name,description,state,type) VALUES (?,?,?,?,?)",[req.body.id,req.body.name,req.body.description,req.body.state,req.body.type],(err,rows)=>{
            if(err) throw err
            console.log(rows);
            res.json(rows);
        });
    }
    console.log("BODY",req.body);

    if(req.body.accion == "editar"){
        utils.query("UPDATE Devices SET id = ?, name = ?, description = ?, state = ?, type = ? WHERE id = ?",[req.body.id,req.body.name,req.body.description,req.body.state,req.body.type,req.body.id],(err,rows)=>{
            if(err) throw err
            console.log(rows);
            res.json(rows);
        });
    }
    if(req.body.accion == "borrar"){
        utils.query("DELETE FROM Devices WHERE id = ?",[req.body.id],(err,rows)=>{
            if(err) throw err
            console.log(rows);
            res.json(rows);
        });
    }
    if(req.body.accion == "switch"){
        var type;
        if (req.body.type == true){
            type = 1;
        }
        else type = 0
        console.log("TIPO ",type)
        utils.query("UPDATE Devices SET type = ? WHERE id = ?",[type,req.body.id],(err,rows)=>{
            if(err) throw err
            console.log(rows);
            res.json(rows);
        });
    }
});


//=======[ Main module code ]==================================================
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================