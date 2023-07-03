const { TRANSFER_CONNECT_API_URL } = require('../utils/config.js');
const transactionSchema = require('../models/transactionEnquiryModel.js');
const mongoose  = require('mongoose');


//can improve code by using caching for faster data retrieval

//processRoute
async function processRoute(req, res){
  const id = req.params;
  if (id == null){
      return;
  }
  console.log(id.loyalty_program);
  console.log(id.bank_app);
  console.log(id.referencenumber);

  //connections to specific DB and collection
  var bank_name = id.bank_app;
  var loyalty_program_name = id.loyalty_program;
  const database_connection = mongoose.connection.useDb(loyalty_program_name);
  const collection_connection = database_connection.model(bank_name, transactionSchema, bank_name);

  //pass in reference numbers
  const id_list = id.referencenumber.split(",");
  console.log(id_list);
  const transactions = await getOutcomeCode(collection_connection, id_list);

  res.send(transactions);
  return;
}



async function getOutcomeCode(collection_connection, id_list){
  console.log(id_list);
  let outcomeCodes = [];
  //use of instead of in - in makes 0000 into 0 
  for (id of id_list){
    console.log(id);
    await collection_connection.find({"referenceNumber": id}, {"outcomeCode": 1, "referenceNumber": 1, "_id": 0 })
    .then(user => {
      if (user) {
        console.log('Found transactions:', user);
        outcomeCodes = user;

      } else {
        console.log('Transactions not found');
      }
    })
    .catch(error => {
      console.error('Error finding transaction:', error);
  });}
  return outcomeCodes;
  };

async function processRouteAdd(req){
  const id = req.params;
  if (id == null){
      return;
  }
  console.log(id.loyalty_program);
  console.log(id.bank_app);

  //connections to specific DB and collection
  var bank_name = id.bank_app;
  var loyalty_program_name = id.loyalty_program;
  const database_connection = mongoose.connection.useDb(loyalty_program_name);
  const collection_connection = database_connection.model(bank_name, transactionSchema, bank_name);
  submitTransaction(collection_connection);

  return;
};


//add transaction (for testing)
async function submitTransaction(collection_connection){
    const transactionData = {
      "membershipId": "1230oij",
      "membershipName": "test_Data",
      "transferDate": "2020-01-01",
      "transferAmount": 10000,
      "referenceNumber": "1111",
      "partnerCode": "DBS",
      "outcomeCode": "00"
      };
    const transaction1 = new collection_connection(transactionData);
    console.log(transaction1);
    transaction1.save()
      .then(() => {
        console.log('Transfer form data saved to MongoDB');
      })
      .catch((error) => {
        console.error('Error saving transfer form data:', error);
      });
  
    };

module.exports = {processRoute, processRouteAdd};