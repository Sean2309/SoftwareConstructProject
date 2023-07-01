const transferFormRouter = require('express').Router();
const transferFormController = require('../controllers/transferFormController');

/* 
  sample data format
  {
    embershipId": "1021030213",
      "memberName": "kei lowth
    "transferDate", "23-10-2000"",
    "transferAmount": "2000"    
  }

*/


// Easy debug GET
transferFormRouter.get('/', transferFormController.getAllForms);

// Route for creating a new transfer form
transferFormRouter.post('/', transferFormController.submitTransferForm)

module.exports = transferFormRouter;