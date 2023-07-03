const express = require('express');
const transactionmodel = require('../controllers/transactionEnquiryController.js');
var router = express.Router();

//for testing purposes only
router.get('/add/:bank_app/:loyalty_program', async function(req, res, next) {
    transactionmodel.processRouteAdd(req);
});


router.get('/check/:bank_app/:loyalty_program/:referencenumber', async function(req, res, next) {
    const id = req.params;
  if (id == null){
      return;
  }
  console.log(id.loyalty_program);
  console.log(id.bank_app);
  console.log(id.referencenumber);
    transactionmodel.processRoute(req, res);
});


module.exports = {router};


