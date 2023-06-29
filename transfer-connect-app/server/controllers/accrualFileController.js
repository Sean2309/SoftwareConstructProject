require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');
const AccrualFileForm = require('../models/accrualFileForm');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

