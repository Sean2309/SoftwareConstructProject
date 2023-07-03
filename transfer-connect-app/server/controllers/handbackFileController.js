// Some Definitions
// POST Requests: Sending data to server 
// GET Requests: Retrieving data from the server

// TODO
// How the Handback File Works:
// 1. Receives reminder daily using CronJob to run the handback file controller
// 2. retrieveFromServer(): Retrieve the data from the transfer connect db => filters based on the outcome code
  // for each collection (i.e loyalty program) => extract the accrual file
// 3. consolidateInfo(): generates confirmedTransactions -> List of confirmed transactions for the day
// 4. responseToGet(): converts the confirmedTransactions list into a JSON 
// sample file naming for csv: {PARTNER_CODE}_HANDBACK_{CURRENT_DATE}.txt (e.g. “AL_HANDBACK_20200812.txt”) 
// 5. 

// Importing files/modules
require('dotenv').config({path: __dirname + '/../.env'});
const handbackFileFormSchema = require('../models/handbackFileForm');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');

// // Datetime
function getDate(date) {
  const day = date.getDate(); // Get the day (1-31)
  const month = date.getMonth() + 1; // Get the month (0-11), add 1 to match the human-readable month (1-12)
  const year = date.getFullYear(); // Get the four-digit year
  const date_out = `${year}${month}${day}`;
  return date_out;
}
// // Getting Current Date
const currentDate = getDate(new Date());
console.log(`Current Date : ${currentDate}`);

// Define Collections
const collections = [`handback_test1`];

// TODO
// Workflow:
1. 



const retrieveFromServer = async() => {

  const transactionSchema = new mongoose.Schema({
    membershipId: String,
    membershipName: String,
    transferDate: String,
    transferAmount: Number,
    referenceNumber: String,
    partnerCode: String,
    outcomeCode: String
  });

  const lp_list = [`DBSSG`];
  const date1 = `20200812`;

  for (const lp of lp_list ) {
    Files.setBaseUrl('https://kaligo.files.com');
    Files.setApiKey('d823bcf8852f7259262f425a839a05f88f51fa57e9cddb8c3d1493d10c04192e');
      const filePath = `/transfer_connect_sutd_case_study_2023/c4i1/Handback/${lp}/${lp}_HANDBACK_${date1}.csv`
      console.log(filePath);
      const foundFile = await File.find(filePath);
      const downloadableFile = await foundFile.download();

      // for (const collection of collections) {
      if (!isBrowser()) {
        // download to a file on disk
        await downloadableFile.downloadToFile(`./out/test_out.csv`);
      }
    // };
  }
    
  
  // const csvWriter = createCsvWriter({
  //   path: `AL_HANDBACK.csv`,
  //   header: [
  //     {id: 'memberID', title: 'Member ID'},
  //     {id: 'memberFirstName', title: 'Member first name'},
  //     {id: 'memberLastName', title: 'Member last name'},
  //     {id: 'transferDate', title: 'Transfer date'},
  //     {id: 'amount', title: 'Amount'},
  //     {id: 'referenceNumber', title: 'Reference number'},
  //     {id: 'partnerCode', title: 'Partner code'},
  //     {id: `outcomeCode`, title: `Outcome Code`}
  //   ],
  // });
  //  const outcomeCode_list = [`0000`, `0001`, `0002`, `0003`, `0004`, `0005`, `0099`]
  //  const gen_outcomeCode = outcomeCode_list[Math.floor(Math.random() * items.length)];

  //  // Writing to the csv file
  //   await csvWriter.writeRecords()

  // Write to the csv file
  // await csvWriter.writeRecords()
  }
    

// Creating the handback csv files
// const writeCollectionsToCsv = async() => {
//   mongoose.connect(process.env.MONGODB_URL1, { useNewUrlParser: true, useUnifiedTopology: true });

//   // Finding the data to append
//   for (const collection of collections) {
//     const Model = mongoose.model(collection, handbackFileFormSchema);
//     const currDate = new Date()
//     currDate.setHours(0,0,0,0);

//     console.log(currDate);
//     console.log("##################")
//     const current_date1 = `2023-07-03T00:00:00.000+00:00`
//     console.log(`2023-07-03T00:00:00.000+00:00` == currDate);
//     // TODO: Need to sync the uploaded data to the current date. Current format for the new Date() in js and uploaded date in Mongo DB is different
//     const filter = { transferDate: current_date1 };
//     try {

//       const csvWriter = createCsvWriter({
//         path: `${collection}_HANDBACK_${currentDate}.csv`,
//         header: [
//           {id: `transferDate`, title: `Transfer Date`},
//           {id: `amount`, title: `Amount`},
//           {id: `referenceNumber`, title: `Reference number`},
//           {id: `outcomeCode`, title: `Outcome Code`}
//         ],
//       });
    
//       csvWriter.writeRecords([]);

//       const data = await Model.find(filter);
//       const newData = data.map(doc => doc.toObject());
//       console.log("Data Retrieved from " + collection + ": ", newData);
      
//       const csvWriter1 = createCsvWriter({
//         path: `${collection}_HANDBACK_${currentDate}.csv`,
//         header: [
//           {id: `transferDate`, title: `Transfer Date`},
//           {id: `amount`, title: `Amount`},
//           {id: `referenceNumber`, title: `Reference Number`},
//           {id: `outcomeCode`, title: `Outcome Code`}
//         ],
//         append: true
//       });

//       // TODO: randomise outcome code?

//       await csvWriter1.writeRecords(newData);

//       console.log(`Data written to ${currentDate}_handback_out.csv.`);

//       }
//       catch (error) {
//         console.error("An error occurred while handling collection " + collection + ": " + error);
//         }
//   }
//   mongoose.connection.close();
// };

// const uploadFilesToServer = async () => {
//   Files.setBaseUrl('https://kaligo.files.com');
//   Files.setApiKey('d823bcf8852f7259262f425a839a05f88f51fa57e9cddb8c3d1493d10c04192e');

//   for (const collection of collections) {
//     if (!isBrowser()) {
//       try { 
//         await File.uploadFile(`/transfer_connect_sutd_case_study_2023/c4i1/Handback/AL_HANDBACK_${collection}_${currentDate}.txt`, `${collection}_HANDBACK_${currentDate}.csv`);
//         console.log('File uploaded successfully.');
//       } catch (error) {
//         console.error('An error occurred while uploading file for collection ' + collection + ':', error);
//       }
//     } else {
//       console.log('File upload skipped because it is running in a browser environment.');
//     }
//   }
// };

// // Updating the handback file into DB
// const updateDB = async() => {
//   mongoose.connect(process.env.MONGODB_URL1, {useNewUrlParser: true, useUnifiedTopology: true} );

//   // Need to filter based on the loyalty program
//   for (const collection in collections) {
//     const Model = mongoose.model(collection, handbackFileFormSchema);
//     try {
      
//     }
//     catch (err) {
//       console.log("Failed to upload to mongo db" + err);
//     }
//   };
// }




// Running the functions
const main = async () => {
  // await writeCollectionsToCsv();
  // await uploadFilesToServer();
  await retrieveFromServer();
  console.log("Done!");
}

main().catch(console.error);