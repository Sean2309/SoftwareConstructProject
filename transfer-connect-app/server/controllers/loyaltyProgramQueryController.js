const express = require('express');
const loyaltyProgramQueryController = express.Router();
const loyaltyProgramQueryModel = require('../models/loyaltyProgramQueryModel');
const currencyRateModel = require('../models/currencyRateModel');

/* 
  sample data format :LoyaltyProgramQuery Model 
  { 
  programID: "GOPOINTS"
  programName: "GoJet Points"
  currencyName: "GoPoints"
  processingTime: "Instant"
  description: "YOL"
  enrollmentLink: "https://www.gojet.com/member/"
  tncLink: "https://www.gojet.com/aa/about-us/en/gb/terms-and-conditions.html"
  }

    sample data format :CurrencyRate Model 
  { 
    currencyRate: "1"
    programID: "GOPOINTS"
  }

*/

// loyaltyProgramQueryController.get('/LPPdata', async(req,res) => {
loyaltyProgramQueryController.get('/:programID', async(req,res) => {
  try {
    // const data = await loyaltyProgramQueryModel.find({});
    const { programID } = req.params;
    
    // convert documents to an array 
    const loyaltyProgramProviders = await loyaltyProgramQueryModel.find({programID});
    const currencyRates = await currencyRateModel.find({programID});

    // Combine the data from both collections based on the programID field
    const combinedData = loyaltyProgramProviders.map(program => {
    const currencyRate = currencyRates.find(rate => rate.programID === program.programID);
    const transformedDocument={
      programID: program.programID,
      programName: program.programName,
      currencyName: program.currencyName,
      processingTime: program.processingTime,
      description: program.description,
      enrollmentLink: program.enrollmentLink,
      tncLink: program.tncLink,
      membershipFormat: program.membershipFormat,
      currencyRate: currencyRate ? currencyRate.currencyRate : null
    };
    // if (program._id) {
    //   transformedDocument.id = program._id.toString();
    // }
    
    // return transformedDocument;
    });

     // Transform the data before sending the response
     const transformedData = combinedData.map(document => {
      const transformedDocument = { ...document };
      // if (transformedDocument._id) {
      //   transformedDocument.id = transformedDocument._id.toString();
      //   delete transformedDocument._id;
      // }
      delete transformedDocument._id;
      // delete transformedDocument.__v;
      return transformedDocument;
    });

    //  // Transform the data before sending the response
    //  const transformedData = data.map(document => {
    //   const transformedDocument = { ...document._doc };
    //   transformedDocument.id = transformedDocument._id.toString();
    //   delete transformedDocument._id;
    //   delete transformedDocument.__v;
    //   delete transformedDocument.id;
    //   return transformedDocument;
    // });
    
    console.log(transformedData); // Output transformed data to the terminal
    res.status(200).json(transformedData); // convert 'transformedData' to JSON string and send as the response body , along with HTTP status 

}
  catch (error){
    res.status(500).json({message:error.message})
  }
})


module.exports = loyaltyProgramQueryController;





// -------------------- ADDITION TO DB ------------ // 
// Insert new LoyaltyProgramProvider into Db 
// createLoyaltyProgramProvider = async (request, response) => {

//   try {
//     const { programID, programName, currencyName, processingTime, description, enrollmentLink, tncLink } = request.body;

//     // Create a new loyalty program provider using LoyaltyProgramQuery model
//     const provider = new loyaltyProgramQueryModel({
//       programID: "GOPOINTS",
//       programName: "GoJet Points",
//       currencyName: "GoPoints",
//       processingTime: "Instant",
//       description: "YOL",
//       enrollmentLink: "https://www.gojet.com/member/",
//       tncLink: "https://www.gojet.com/aa/about-us/en/gb/terms-and-conditions.html"
//     });

//     // Save the new provider to the database
//     await provider.save();

//     //Succesful update
//     console.log(`Loyalty Program Provider successfully added to Db`)
//     res.sendStatus(201); 
//     provider.mongoose.connection.close()

//   } catch (error) {
//     // Error handling
//     console.log(`Failed to add Loyalty Program Provider to Db`)
//     res.status(500).json({ error: `Failed to add Loyalty Program Provider to Db` });
//   }
// };
// --------------------------------- //



