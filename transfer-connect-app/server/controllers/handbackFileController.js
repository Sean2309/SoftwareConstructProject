// Some Definitions
// POST Requests: Sending data to server 
// GET Requests: Retrieving data from the server

// TODO
// 1. Downlaod handback file from SFTP server: Handback/<LP>/... .csv
// 2. Iterate through every LP
// 3. 

// Importing files/modules
require('dotenv').config({path: __dirname + '/../.env'});
const handbackFileFormSchema = require('../models/handbackFileForm');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');

// Datetime
function getDate(date) {
  const day = date.getDate(); // Get the day (1-31)
  const month = date.getMonth() + 1; // Get the month (0-11), add 1 to match the human-readable month (1-12)
  const year = date.getFullYear(); // Get the four-digit year
  const date_out = `${year}${month}${day}`;
  return date_out;
}
// Getting Current Date
const currentDate = getDate(new Date());

// Define Collections
const collections = [`handback_test1`];
const mongo_lp_list = [`dbssgs`, `qflyers`, `gojets`];

const retrieveFromServer = async() => {

  const sftp_lp_list = ['DBSSG', `QFlyers`, `GoJets`];
  
  const sftp_test_date = `20200812`;

  for (const lp of sftp_lp_list ) {
    Files.setBaseUrl('https://kaligo.files.com');
    Files.setApiKey('d823bcf8852f7259262f425a839a05f88f51fa57e9cddb8c3d1493d10c04192e');
    const fileName = `${lp}_HANDBACK_${sftp_test_date}.csv`;
    
    const foundFile = await File.find(`/transfer_connect_sutd_case_study_2023/c4i1/Handback/${lp}/${fileName}`);
    const downloadableFile = await foundFile.download();
{
    if (!isBrowser()) {
      // download to a file on disk
      await downloadableFile.downloadToFile(`./sftp_handback_downloads/${fileName}`);
    }
  }
};
    
  
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