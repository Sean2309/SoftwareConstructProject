const express = require('express');
const transactionmodel = require('../controllers/transactionEnquiryController.js');
var router = express.Router();


//for testing purposes
router.get('/check/:referencenumber', async function(req, res, next) {
    const id = req.params;
    console.log(id.referencenumber);
    const id_list = id.referencenumber.split(",");
    console.log(id_list);
    const transactions = await transactionmodel.getStatus(id_list);
    res.send(transactions); 
});



module.exports = router;
