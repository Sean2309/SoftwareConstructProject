require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');
const accrualFileFormSchema = require('../models/accrualFileForm');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('accrual_files')) {
  fs.mkdirSync('accrual_files');
}

const collections = ["qflyers", "gojets", "testaccruals"]; // note please name your collection name in lowercase and add a "s" at the end

const writeCollectionsToCsv = async () => {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  for (const collection of collections) {
    const Model = mongoose.model(collection, accrualFileFormSchema);

    try {
      const data = await Model.find({outcomeCode: {$exists: false}});

      console.log('Data retrieved from ' + collection + ':', data);

      const csvWriter = createCsvWriter({
        path: path.join('accrual_files',`${collection}_out.csv`),
        header: [
          {id: 'membershipId', title: 'Membership ID'},
          {id: 'membershipName', title: 'Membership name'},
          {id: 'transferDate', title: 'Transfer date'},
          {id: 'transferAmount', title: 'Transfer Amount'},
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
        await File.uploadFile(`/transfer_connect_sutd_case_study_2023/c4i1/Accrual/${collection}/AL_ACCRUAL_${collection}_20200812.csv`, path.join('accrual_files', `${collection}_out.csv`));
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