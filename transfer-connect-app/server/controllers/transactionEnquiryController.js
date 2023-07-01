const { TRANSFER_CONNECT_API_URL } = require('../utils/config.js');
const handback = require('../models/transactionEnquiryModel.js');

//can improve code by using caching for faster data retrieval

//getStatus
async function getOutcomeCode(id_list){
    let outcomeCodes = [];
    for (let id of id_list){
      await handback.find({"Reference number": id}, {"Outcome code": 1, "Reference number": 1})
      .then(user => {
        if (user) {
          console.log('Found transactions:', user);
          outcomeCodes.push(user);

        } else {
          console.log('Transactions not found');
        }
      })
      .catch(error => {
        console.error('Error finding transaction:', error);
      });}
      return outcomeCodes;
  }

//add transaction (for testing)
async function submitTransaction(){
    const transactionData = {
      "Reference number": "0000",
      "Transfer date": new Date(),
      "Outcome code": "0001",
      "Amount": 1000,
      };
  
    const transaction1 = new handback(transactionData);
  
    transaction1.save()
      .then(() => {
        console.log('Transfer form data saved to MongoDB');
      })
      .catch((error) => {
        console.error('Error saving transfer form data:', error);
      });
  
    };

module.exports = {getOutcomeCode, submitTransaction};