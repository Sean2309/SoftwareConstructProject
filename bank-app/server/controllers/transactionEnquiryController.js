const axios = require('axios');
const { TRANSFER_CONNECT_API_URL } = require('../utils/config.js');
const { mongoose } = require('mongoose');
const transactionSchema = require('../models/transactionEnquiryModel.js').transactionSchema;
const loyaltyprograms = require('../models/transactionEnquiryModel.js').loyaltyprograms;

 

async function getReferenceNumbers(loyaltyprogram){
  //connect to specific collection
  const collection_connection = mongoose.model(loyaltyprogram, transactionSchema, loyaltyprogram);
  
  //remember to define variables first
  let reference_numbers = [];
  //find those that don't have outcomeCode declared or values are empty
  await collection_connection.find({"outcomeCode":{$exists: true, $ne:""}}, {"Reference number": 1})
    .then(transactions => {
      if (transactions) {
        console.log('Found reference numbers:', transactions);
        reference_numbers = (transactions.map(transaction => transaction['Reference number']));
      } else {
        console.log('No reference numbers found');
      }
    })
    .catch(error => {
      console.error('Error finding reference numbers:', error);
    });
    console.log(reference_numbers);
    return reference_numbers;}
  

async function makeApiRequest(id_list, loyaltyprogram) {
  if (id_list.length === 0){
    console.log("id_list is null")
    return;
  }
  var response;
  //id_list is obtained from getReferenceNumbers
  let string_ids = (id_list).join();
  let url = TRANSFER_CONNECT_API_URL + '/transferconnect/DBS/' + loyaltyprogram;
  url = url + string_ids;
  console.log(url);
  try {
    response = await axios.get(url); // Await the API response
    console.log(response.data); // Handle the API response
  } catch (error) {
    // Handle any errors
    console.error(error);
  };
  return response.data;
  }


setInterval(() => {
  for (let loyaltyprogram in loyaltyprograms){
  getReferenceNumbers(loyaltyprogram)
    .then(id_list => makeApiRequest(id_list, loyaltyprogram))
    .then(response_data => updateOutcomeCodes(response_data))
    .catch(error => {
      // Handle any errors that occur during the promise chain
      console.error(error);
    });}
}, 5 * 1000); // 5 seconds


//to update bank-app database
async function updateOutcomeCodes(handback_data){
  if (handback_data === null || handback_data === undefined){
    console.log("handback_data is null")
    return;
  }
  for (const data of handback_data){
    let reference_number = data["Reference number"];
    console.log(reference_number);
    let outcome_code = data["Outcome code"];
    console.log(outcome_code);
    handback.updateOne({"Reference number": reference_number}, {$set: {"Outcome code": outcome_code}}).exec();
  };
  return;
};

