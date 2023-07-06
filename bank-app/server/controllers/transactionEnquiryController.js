const axios = require('axios');
const { TRANSFER_CONNECT_API_URL } = require('../utils/config.js');
const { mongoose } = require('mongoose');
const transactionSchema = require('../models/transactionEnquiryModel.js').transactionSchema;
const loyaltyprograms = require('../models/transactionEnquiryModel.js').loyaltyprograms;

class TransactionEnquiryController {
  
  constructor() {
    this.startEnquiry();
  }

  getReferenceNumbers = async (loyaltyprogram) => {
    //connect to specific collection
    const collection_connection = mongoose.model(loyaltyprogram, transactionSchema, loyaltyprogram);

    //remember to define variables first
    let reference_numbers = [];
    //find those that don't have outcomeCode declared or values are empty
    await collection_connection.find({ "outcomeCode": { $exists: false} }, { "referenceNumber": 1, "_id": 0})
      .then(transactions => {
        if (transactions) {
          console.log('Found reference numbers:', transactions);
          reference_numbers = (transactions.map(transaction => transaction['referenceNumber']));
        } else {
          console.log('No reference numbers found');
        }
      })
      .catch(error => {
        console.error('Error finding reference numbers:', error);
      });
    console.log(reference_numbers);
    return reference_numbers;
  }


  makeApiRequest = async (id_list, loyaltyprogram) => {
    
    if (id_list.length === 0) {
      console.log("id_list is null")
      return;
    }
    var response;
    //id_list is obtained from getReferenceNumbers
    let string_ids = (id_list).join();
    let url = TRANSFER_CONNECT_API_URL + '/transferconnect/check/DBS/' + loyaltyprogram;
    url = url + "/" + string_ids;
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

  startEnquiry = () => {
    console.log('hello');
    setInterval(() => {
      for (const loyaltyprogram of loyaltyprograms) {
        console.log(loyaltyprograms);
        console.log(loyaltyprogram);
        this.getReferenceNumbers(loyaltyprogram)
          .then(id_list => this.makeApiRequest(id_list, loyaltyprogram))
          .then(response_data => this.updateOutcomeCodes(response_data))
          .catch(error => {
            // Handle any errors that occur during the promise chain
            console.error(error);
          });
      }
    }, 5 * 1000); // 5 seconds
  }


  //to update bank-app database
  updateOutcomeCodes = async (handback_data) => {
    if (handback_data === null || handback_data === undefined) {
      console.log("handback_data is null")
      return;
    }
    for (const data of handback_data) {
      let reference_number = data["referenceNumber"];
      console.log(reference_number);
      let outcome_code = data["outcomeCode"];
      console.log(outcome_code);
      collection_connection.updateOne({ "referenceNumber": reference_number }, { $set: { "outcomeCode": outcome_code } }).exec();
    };
    return;
  }



}

const transactionEnquiryController = new TransactionEnquiryController();

module.exports = transactionEnquiryController;