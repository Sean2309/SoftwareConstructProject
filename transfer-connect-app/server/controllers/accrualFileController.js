require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');
const AccrualFileForm = require('../models/accrualFileForm');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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


const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'index', title: 'INDEX'},
    {id: 'memberID', title: 'MEMBER_ID'},
    {id: 'memberFirstName', title: 'MEMBER_FIRST_NAME'},
    {id: 'memberLastName', title: 'MEMBER_LAST_NAME'},
    {id: 'transferDate', title: 'TRANSFER_DATE'},
    {id: 'amount', title: 'AMOUNT'},
    {id: 'referenceNumber', title: 'REFERENCE_NUMBER'},
    {id: 'partnerCode', title: 'PARTNER_CODE'}
  ]
});

const retrieveAndWriteToCsv = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const data = await AccrualFileForm.find().exec();

    console.log('Data retrieved:', data);

    await csvWriter.writeRecords(data);

    console.log('Data written to out.csv.');

    mongoose.connection.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

retrieveAndWriteToCsv();