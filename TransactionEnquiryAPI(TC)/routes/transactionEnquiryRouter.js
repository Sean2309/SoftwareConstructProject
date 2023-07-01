const express = require('express');
const transactionmodel = require('../controllers/transactionEnquiryController.js');
var router = express.Router();

//for testing purposes only
router.get('/add', async function(req, res, next) {
    transactionmodel.submitTransaction(req, res);
});


router.get('/check/:referencenumber', async function(req, res, next) {
    const id = req.params;
    console.log(id.referencenumber);
    const id_list = id.referencenumber.split(",");
    console.log(id_list);
    const transactions = await transactionmodel.getOutcomeCode(id_list);
    res.send(transactions); 
});


module.exports = router;


