// Importing files/modules
require('dotenv').config({path: __dirname + '/../.env'});
const handbackFileFormSchema = require('../models/handbackFileForm');
const mongoose = require('mongoose');
const fs = require(`fs`);
const csvParser = require(`csv-parser`);
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');
const { resolve } = require('path');

// Datetime
function getDate(date) {
  const day = date.getDate(); // Get the day (1-31)
  const month = date.getMonth() + 1; // Get the month (0-11), add 1 to match the human-readable month (1-12)
  const year = date.getFullYear(); // Get the four-digit year
  const date_out = `${year}${month}${day}`;
  return date_out;
}
// Getting Current Date
const currentDate = getDate(new Date()); // to change into testDate after final implementation

// Defining Collection Names
const mongoLPList = [`dbssgs`, `qflyers`, `gojets`]; // TODO: Use only one list and transform the other to match 
const sftpLPList = ['DBSSG', `QFlyers`, `GoJets`];
const testDate = `20200812`; // TODO: Change this to current date on final implementation

const retrieveFromServer = async() => {
  for (const lp of sftpLPList ) {
    // Config Details
    Files.setBaseUrl('https://kaligo.files.com');
    Files.setApiKey('d823bcf8852f7259262f425a839a05f88f51fa57e9cddb8c3d1493d10c04192e');

    // Downloading the handback file from the server
    const fileName = `${lp}_HANDBACK_${testDate}.csv`;
    const foundFile = await File.find(`/transfer_connect_sutd_case_study_2023/c4i1/Handback/${lp}/${fileName}`);
    const downloadableFile = await foundFile.download();

    if (!isBrowser()) {
      // Download to a file on disk
      await downloadableFile.downloadToFile(`./sftp_handback_downloads/${fileName}`);
    }
  };
}

const extractDataFromCsv = async(filePath) => {

  return new Promise((resolve, reject) => {
    // List of outcomeCodes
    const outcomeCodeList = ['0000', '0001', '0002', '0003', '0004', '0005', '0099'];
    // Randomly pick an outcomeCode
    const random_outcomeCode = outcomeCodeList[Math.floor(Math.random() * outcomeCodeList.length)];

    const str1 = filePath.split('/');
    const splitStr = str1[str1.length-1].split(/_/);
    const partnerCode = splitStr[0];

    const results = []; // List to store the dictionaries

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        // Adding outcomeCode field
        data[`Outcome Code`] = random_outcomeCode;

        // Pushing the whole result
        results.push(data);
      })
      .on('end', () => {
        resolve([partnerCode, results]);
      })
      .on(`error`, (error) =>  {
        reject(error);
      })
  });
  
}

const uploadFilesToMongoDB = async() => {
  // Naming Conventions:
  // 1. SFTP Server Name: DBSSG
  // 2. MongoDB Collection Name: dbssg

  // Connecting to MongoDB
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  // Iterating through each LP
  for (let i = 0; i < sftpLPList.length; i++) {
    // Getting the file path
    const filePath = `./sftp_handback_downloads/${sftpLPList[i]}_HANDBACK_${testDate}.csv`;
    // console.log(`File path is: ${filePath}`);
    
    try {
      // Extracting the data from the csv file
      const [partnerCode, results] = await extractDataFromCsv(filePath);
      console.log(`Current collection: ${partnerCode}`);
  
      // console.log(`Partner code is: ${partnerCode}`);
      // console.log(`Results are: ${data}`)

      const Model = await mongoose.model(mongoLPList[i], handbackFileFormSchema);
      // TODO: Find the correct method to update the mongo db
      // results dtype: [object Object] => Cannot call the attributes
      // const data = results.map((result) => {
      //   return new Model(result);
      // } )
      
      // console.log(data)
      await Model.updateMany(
        { partnerCode: partnerCode, referenceNumber: results.referenceNumber },
        { $set: [
          {outcomeCode : results[`Outcome Code`]},
        ] }
      )
      // for (let j=0; j < results.length;j++) {
      //   const item = results[j];
      //   console.log(item);
      //   console.log(`#########`)


      //   // await Model.updateMany(
      //   //   { referenceNumber: item[`Reference number`] , 
      //   //     transferDate: item[`Transfer date`]
      //   //   },
      //   //   { $set: [
      //   //     {outcomeCode : item[`Outcome Code`]},
      //   //   ] }
      //   // )
      //   // await Model.insertMany(item);
      // }

      // await Model.insertMany(results);
      console.log("Data inserted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  mongoose.connection.close();
}    

// Running the functions
const main = async () => {
  // await retrieveFromServer();
  await uploadFilesToMongoDB();
  console.log("Done!");
}

main().catch(console.error);