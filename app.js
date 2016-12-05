var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');
var bignum = require('bignum');
var cors = require('cors');


var methodOverride = require('method-override');


var app = express();



var crypto = require('./routes/crypto');
var rsa = require('./routes/rsa-bignum');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use('/crypto',crypto);


module.exports = app;


app.listen(3001);

console.log("TTP running on port 3001");