const transferFormController = require('express').Router()
const TransferForm = require('../models/transferForm');

/* 
  {
    "cardholderName": "keith",
    "membershipNo": "1021030213",
    "transferAmount": "2000"    
  }

*/


// Easy debug GET
transferFormController.get('/', async (request, response) => {
  response.send("why are you here not supposed to GET");
});

// Handle the POST request to create a new transfer form
transferFormController.post('/', async (request, response) => {
  const transferFormData = request.body;

  const transferForm = new TransferForm(transferFormData);

  transferForm.save()
    .then(() => {
      console.log('Transfer form data saved to MongoDB');
      response.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error saving transfer form data:', error);
      response.sendStatus(500);
    });

});

module.exports = transferFormController;