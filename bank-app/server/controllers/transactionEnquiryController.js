const axios = require('axios');
const { TRANSFER_CONNECT_API_URL } = require('../utils/config.js');
const handback = require('../models/transactionEnquiryModel.js');

 
async function makeApiRequest() {
    let url = TRANSFER_CONNECT_API_URL + '/transferconnect/check/';
    url = url + '0000';
    console.log(url);
    try {
      const response = await axios.get(url); // Await the API response
      console.log(response.data); // Handle the API response
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  }
  
    const interval = setInterval((id_list) => {
        makeApiRequest(id_list); // Pass the required argument(s) here
          }, 30 * 1000); //5s
    
    
function stopInterval() {
      clearInterval(interval);
      console.log('Interval stopped.');
    }
    



async function getStatus(id_list){
  for (let id of id_list){
    await handback.find({"Reference number": id}, {"Outcome code": 1, "Reference number": 1})
    .then(user => {
      if (user) {
        console.log('Found user:', user);
      } else {
        console.log('User not found');
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
    });}
}

//add transaction (for testing)
submitTransaction = async (request, response) => {
  const transactionData = {
    "Reference number": "0000",
    "Transfer date": "1111",
    "Outcome code": "0001",
    "Amount": "1000",
    };

  const transaction1 = new handback(transactionData);

  transaction1.save()
    .then(() => {
      console.log('Transfer form data saved to MongoDB');
      // send referenceNumber to bank app
      response.status(201).json({ referenceNumber: transaction.referenceNumber });
    })
    .catch((error) => {
      console.error('Error saving transfer form data:', error);
      response.sendStatus(500);
    });

  };


module.exports = {getStatus, submitTransaction};