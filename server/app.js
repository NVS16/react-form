var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var api = require('./app/routes/api');


var port = process.env.PORT || 4000;


var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', api);


app.use(function(req, res, next) {
    res.status(404).send("404! Bad Request!");
});


app.listen(port,function(){
  console.log("Server running at port "+ port);
});