const db = require('./db.js').db;
const axios = require('axios');

const collectionName = 'transactions'


async function makeApiRequest() {
    let url = 'http://localhost:3000/test/check/';
    url = url + '00';
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
          }, 5 * 1000); //5s
    
    
function stopInterval() {
      clearInterval(interval);
      console.log('Interval stopped.');
    }
    

async function getStatus(id_list){
    try {
        console.log(id_list);
        let status_list = {};
        const collection = db.collection (collectionName);
        for (let id of id_list){
            console.log(id);
            let status = await collection.findOne({referencenumber: id},{projection: {date: 0, amount:0, _id:0, referencenumber:0}});
            console.log(status);
            status_list[id] = status.outcomecode;
            console.log(status_list);
        };
        return status_list;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
}
}

module.exports = {makeApiRequest, getStatus, stopInterval};