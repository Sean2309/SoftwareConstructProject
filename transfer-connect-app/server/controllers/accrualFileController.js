require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');
const accrualFileFormSchema = require('../models/accrualFileForm');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');

/*
TODO:
We have an array of collections, each collection is pointing to 1 loyalty program,
const collections = ["QFlyer", "Gojet", ...]

So for each collection, .find() all the transactions for that loyalty program, 
consolidate and then upload to sftp server

Do maybe like a loop?

for (loyaltyProgram of collections) {
  retrieveAndWriteToCsv(loyaltyProgram);
}
*/

const collections = ["qflyers", "gojets", "testaccruals"]; // note please name your collection name in lowercase and add a "s" at the end

const writeCollectionsToCsv = async () => {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  for (const collection of collections) {
    const Model = mongoose.model(collection, accrualFileFormSchema);

    try {
      const data = await Model.find();

      console.log('Data retrieved from ' + collection + ':', data);

      const csvWriter = createCsvWriter({
        path: `${collection}_out.csv`,
        header: [
          {id: 'index', title: 'Index'},
          {id: 'memberID', title: 'Member ID'},
          {id: 'memberFirstName', title: 'Member first name'},
          {id: 'memberLastName', title: 'Member last name'},
          {id: 'transferDate', title: 'Transfer date'},
          {id: 'amount', title: 'Amount'},
          {id: 'referenceNumber', title: 'Reference number'},
          {id: 'partnerCode', title: 'Partner code'}
        ]
      });

      await csvWriter.writeRecords(data);

      console.log(`Data written to ${collection}_out.csv.`);
    } catch (error) {
      console.error('An error occurred while handling collection ' + collection + ':', error);
    }
  }

  mongoose.connection.close();
}

const uploadFilesToServer = async () => {
  Files.setBaseUrl('https://kaligo.files.com');
  Files.setApiKey('d823bcf8852f7259262f425a839a05f88f51fa57e9cddb8c3d1493d10c04192e');

  for (const collection of collections) {
    if (!isBrowser()) {
      try {
        await File.uploadFile(`/transfer_connect_sutd_case_study_2023/c4i1/Accrual/AL_ACCRUAL_${collection}_20200812.txt`, `${collection}_out.csv`);
        console.log('File uploaded successfully.');
      } catch (error) {
        console.error('An error occurred while uploading file for collection ' + collection + ':', error);
      }
    } else {
      console.log('File upload skipped because it is running in a browser environment.');
    }
  }
}

const main = async () => {
  await writeCollectionsToCsv();
  await uploadFilesToServer();
};

main().catch(console.error);


const queryFromDBandUpload = async () =>{
  writeCollectionsToCsv();
  await uploadFilesToServer();
}