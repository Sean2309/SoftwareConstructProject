const express = require('express');
const loyaltyProgramQueryController = express.Router();
const loyaltyProgramQueryModel = require('../models/loyaltyProgramQueryModel');

/* 
  sample data format
  { 
  programID: "GOPOINTS"
  programName: "GoJet Points"
  currencyName: "GoPoints"
  processingTime: "Instant"
  description: "YOL"
  enrollmentLink: "https://www.gojet.com/member/"
  tncLink: "https://www.gojet.com/aa/about-us/en/gb/terms-and-conditions.html"
  }

*/

// console.log(loyaltyProgramQueryModel.find({}));
loyaltyProgramQueryController.get('/LPPdata', async(req,res) => {
  try {
    const data = await loyaltyProgramQueryModel.find({});

     // Transform the data before sending the response
     const transformedData = data.map(document => {
      const transformedDocument = { ...document._doc };
      transformedDocument.id = transformedDocument._id.toString();
      delete transformedDocument._id;
      delete transformedDocument.__v;
      delete transformedDocument.id;
      return transformedDocument;
    });
    
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



