/**
 * Created by irkalla on 05.10.16.
 */
var express = require('express');
var router = express.Router();
var rsa = require('./rsa-bignum');
var bignum = require('bignum');
var CryptoJS = require('crypto-js');
var request = require('request');
var keys = rsa.generateKeys(128);



router.get('/protocol5',function(req,res){

}) ;

router.post('/protocol5',function(req,res){

    console.log('########## RECEIVING INFO FROM A... ##########');
    var src = 'A';
    var dst = 'B';
    var ttp = req.body.data.ttp;
    var k = req.body.data.k;
    var proofOrigin = req.body.data.proofOrigin;
    var pubkA_n = req.body.data.publickey.n;
    var pubkA_e = req.body.data.publickey.e;
    var concatenated = ttp+'-'+src+'-'+dst+'-'+k;
    var hasHH = CryptoJS.MD5(concatenated);
    var hashToClient = bignum(hasHH.toString(),16);
    var proofOriginS = keys.privateKey.encrypt(hashToClient);

console.log('########## SENDING FINAL MESSAGE TO B...##########');

    res.status(200).send({ttp:ttp,src:src,dst:dst,k:k,proofOrigin:proofOriginS.toString(16)});

    request.post(
        'http://localhost:3000/crypto/protocol5_ttp',
        { json: {ttp:ttp,src:src,dst:dst,k:k,proofOrigin:proofOriginS.toString(16)} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );


});

module.exports = router;