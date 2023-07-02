// Some Definitions
// POST Requests: Sending data to servr 
// GET Requests: Retrieving data from the server

// TODO
// How the Handback File Works:
// 1. Receives reminder daily using CronJob to run the handback file controller
// 2. retrieveFromServer(): Retrieve the data from the transfer connect db => filters based on the outcome code
  // for each collection (i.e loyalty program) => extract the accrual file
  // retrieve the handback file from the db => convert it into a handback file (.csv)
// 3. consolidateInfo(): generates confirmedTran sactions -> List of confirmed transactions for the day
// 4. responseToGet(): converts the confirmedTransactions list into a JSON 
// sample file naming for csv: {PARTNER_CODE}_HANDBACK_{CURRENT_DATE}.txt (e.g. “AL_HANDBACK_20200812.txt”) 
// 5. 

// Config Details for Mongo DB Connection
require("dotenv").config({path: __dirname} + "/../.env");

// Importing files/modules
const mongoose = require("mongoose");
const handbackFileFormSchema = require('../models/handbackFileForm');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');



// Datetime
const date = new Date();
const day = date.getDate(); // Get the day (1-31)
const month = date.getMonth() + 1; // Get the month (0-11), add 1 to match the human-readable month (1-12)
const year = date.getFullYear(); // Get the four-digit year
const currentDate = `${day}_${month}_${year}`;

// FOR TESTING PURPOSES: CONNECTING TO PERSONAL MONGODB
const username = encodeURIComponent("seanphay");
const password = encodeURIComponent("ben10ben");
const uri = `mongodb+srv://${username}:${password}@handback.ml78h2m.mongodb.net/handback`;
const collections = [`handbackfiles`,`handback_test1`, `handback_test2`];

// Creating the handback csv file
const writeCollectionsToCsv = async() => {
  mongoose.connect("mongodb+srv://tengtjinyang:zagNwPsta2HHTyfE@transferconnect.0papjri.mongodb.net/TransferConnectDB", {useNewUrlParser: true, useUnifiedTopology: true} );

  // Finding the data to append
  for (const collection of collections) {
    const Model = mongoose.model(collection, handbackFileFormSchema);
    try {
      const data = await Model.find();
    
      console.log("Data Retrieved from " + collection + ": " + data);
      
      const csvWriter = createCsvWriter({
        path: `${currentDate}_handback_out.csv`,
        header: [
          {id: "transferDate", title: "Transfer Date"},
          {id: "amount", title: "Amount"},
          {id: "referenceNumber", title: "Reference number"},
          {id: "outcomeCode", title: "Outcome Code"}
        ]
      });
      // TODO => Figure out how to generate the handback csv 
      await csvWriter.writeRecords(data);

      }
      catch (error) {
        console.error("An error occurred while handling collection " + collection + ": " + error);
        }
      
  }
  mongoose.connection.close();
};


// Running the functions
const main = async () => {
  await writeCollectionsToCsv();
  console.log("Done!");
}

main().catch(console.error);