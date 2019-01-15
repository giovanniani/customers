var express = require('express');
var http = require('http');
var mysql = require("mysql");
var app = express();
var url = require('url');
var bodyParser = require("body-parser");


var port = 4000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
    
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'
});

connection.connect(function(error) {
	if(!!error){
		console.log(error);
	} else {
		console.log("connected - " + new Date().toLocaleString());
	}
});

app.get('/getUser/', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL getUsers()', function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
        console.log("Usuarios devueltos - " + new Date().toLocaleString());
    });

});	


app.listen(port);
console.log("Listening on port:" + port);