const TransferForm = require('../models/transferForm');

/* 
  sample data format
  {
    "membershipId": "1021030213",
    "memberName": "keith low",
    "transferDate", "23-10-2000"
    "transferAmount": "2000"    
  }

*/
  
class TransferFormController {
  
  async getAllForms(request, response) {
    const submittedForms = await TransferForm.find({});
    response.json(submittedForms);
  }
  
  async submitTransferForm(request, response) {
    const transferFormData = request.body;

    const transferForm = new TransferForm(transferFormData);
    
    // TOOD: generate ReferenceNumber to tag to transferForm
    // TODO: tag PartnerCode to transferForm

    transferForm.save()
      .then(() => {
        console.log('Transfer form data saved to MongoDB');
        response.sendStatus(201);
      })
      .catch((error) => {
        console.error('Error saving transfer form data:', error);
        response.sendStatus(500);
      });
    }

};

const transferFormController = new TransferFormController();

module.exports = transferFormController;