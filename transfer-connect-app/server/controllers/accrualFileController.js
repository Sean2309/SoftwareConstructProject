require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');
const AccrualFileForm = require('../models/accrualFileForm');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Files = require('files.com/lib/Files').default;
const File = require('files.com/lib/models/File').default;
const { isBrowser } = require('files.com/lib/utils');

const csvWriter = createCsvWriter({
  path: 'out.csv',
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

const retrieveAndWriteToCsv = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const data = await AccrualFileForm.find();

    console.log('Data retrieved:', data);

    await csvWriter.writeRecords(data);

    console.log('Data written to out.csv.');

    mongoose.connection.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

retrieveAndWriteToCsv();

const uploadFileToServer = async () => {
  Files.setBaseUrl('https://kaligo.files.com');
  Files.setApiKey('d823bcf8852f7259262f425a839a05f88f51fa57e9cddb8c3d1493d10c04192e');
  if (!isBrowser()) {
    await File.uploadFile('/transfer_connect_sutd_case_study_2023/c4i1/Accrual/AL_ACCRUAL_20200812.txt', 'out.csv');
    console.log('File uploaded successfully.');
  } else {
    console.log('File upload skipped because it is running in a browser environment.');
  }
}
// const uploadFileToServer = async () => {
//   const file = await File.uploadFile('AL_ACCRUAL_20200812.txt', 'out.csv')
// }
uploadFileToServer();

const queryFromDBandUpload = async () =>{
  createCsvWriter();
  await retrieveAndWriteToCsv();
  await uploadFileToServer();
}