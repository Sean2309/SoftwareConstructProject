const express = require('express');
const fs = require('fs');
const HandbackFile = require('../models/handbackFile'); 
const handbackFileForm = require('../models/handbackFileForm');
const handbackController = express.Router();

// get data from db, consolidate, and save to AccuralFile
handbackController.get('/testhandbacks', async (request, response) => {
  try {
    const article = await handbackFileForm.find().exec();
    console.log(article);

    // // consolidate data into the CSV file format
    // let data = 'index,Member ID,Member first name,Member last name,Transfer date,Amount,Reference number,Partner code\n';

    // // write the data into a CSV file
    // const filename = `AL_ACCRUAL_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.txt`;
    // fs.writeFileSync(filename, data);

    // const accuralFile = new AccuralFile({ filename, data });
    // await accuralFile.save();

    response.send('Data has been retrieved, consolidated, and saved to MongoDB successfully.');
  } catch (error) {
    console.error('Error:', error);
    response.status(500).send('Error occurred while processing data.');
  }
});

module.exports = handbackController;