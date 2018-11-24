////////////////////////////////////////////////////////////////
///////////**** Routes for all the API calls ******/////////////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();


/* Importing all the controllers. */ 
var mail = require("../controllers/mail");

router.get('/', function(req, res, next) {
  res.json({msg: 'API is working'});
});


router.post('/submit', mail.sendMail);



module.exports = router;