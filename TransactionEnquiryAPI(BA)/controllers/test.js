const express = require('express');
const transactionmodel = require('../models/transaction.js');
var router = express.Router();



router.get('/testenquiry/:referencenumber', async function(req, res, next) {
    const id = req.params;
    console.log(id.referencenumber);
    const id_list = id.referencenumber;
    console.log(id_list);

    transactionmodel.makeApiRequest(id_list);
    transactionmodel.stopInterval();

    console.log("request");
    //res.send(transaction); 
});


router.get('/check/:referencenumber', async function(req, res, next) {
    const id = req.params;
    console.log(id.referencenumber);
    const id_list = id.referencenumber.split(",");
    console.log(id_list);
    const transactions = await transactionmodel.getStatus(id_list);
    res.send(transactions); 
});


module.exports = router;
