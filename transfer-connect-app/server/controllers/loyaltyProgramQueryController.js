// const express = require('express');
// const loyaltyProgramQueryController = express.Router();
const loyaltyProgramQueryModel = require('../models/loyaltyProgramQueryModel');
const currencyRateModel = require('../models/currencyRateModel');


/* 

  sample data format :LoyaltyProgramQuery Model 
  { 
  {programID: "GOPOINTS"
  programName: "GoJet Points"
  currencyName: "GoPoints"
  processingTime: "Instant"
  description: "YOL"
  enrollmentLink: "https://www.gojet.com/member/"
  tncLink: "https://www.gojet.com/aa/about-us/en/gb/terms-and-conditions.html"
  membershipFormat:9digits1letter  
  }

    sample data format :CurrencyRate Model 
  { 
    appName: "BankApp"
    programID: "GOPOINTS,KRISFLYER"
    currencyRate: "1.0,1.5"
  }
    

*/

  class LoyaltyProgramQueryController {
    getLoyaltyPrograms = async (request, response, appName) => {
      console.log(`getLoyaltyPrograms Method is running. appName parameter is` , appName);
      
      try {
      
        const loyaltyProgramsPromise = loyaltyProgramQueryModel.find(); // Fetch all oyaltyProgramProviders

        // Fetch the document correspond to the appName, which contains all loyalty programs and currency rates
        const currencyRates_LPPsPromise = currencyRateModel.find({appName:appName});
  
        const [loyaltyPrograms, currencyRates_LPPs] = await Promise.all([
          loyaltyProgramsPromise,
          currencyRates_LPPsPromise
        ]);
        
        const programRates ={};
        const programIDs= currencyRates_LPPs[0].programID.split(','); // Split the programID string into an array of individual program IDs
        const currencyRates = currencyRates_LPPs[0].currencyRate.split(','); // Split the currencyRate string into an array of individual currency rates
       
        

        programIDs.forEach((programID, index) => {
          programRates[programID] = parseFloat(currencyRates[index]); 
          // Store each program ID with its corresponding currency rate in the programRates object
          // Eg: programRates = { GOPOINTS: 1.0, KRISFLYER: 1.5};
        });

        console.log("########")
        console.log(programRates)
        console.log("########")

        // return respective loyalty program providers with currency rates
        const combinedData = loyaltyPrograms.map((document) => {
          const programID = document.programID;
          const currencyRate = programRates[programID];

          // Check if the program ID exists in programRates
        if (currencyRate !== undefined) {
          return {
            programID: document.programID,
            programName: document.programName,
            currencyName: document.currencyName,
            processingTime: document.processingTime,
            description: document.description,
            enrollmentLink: document.enrollmentLink,
            tncLink: document.tncLink,
            membershipFormat: document.membershipFormat,
            currencyRate: currencyRate,
          };
        }
      });

      // Transform the data before sending the response
      const transformedData = combinedData.map((document) => {
        const transformedDocument = { ...document };
        delete transformedDocument._id;
        return transformedDocument;
      });

      console.log(transformedData); // Output transformed data to the terminal

        // Send the transformed data as the response
        response.status(200).json(transformedData);
      } 
      catch (error) {
        response.status(500).json({ message: error.message });
      }
    };
  }

const loyaltyProgramQueryController = new LoyaltyProgramQueryController();

module.exports = loyaltyProgramQueryController;



// ----------- Serialized JSON response -------- //
    //  // Transform the data before sending the response
    //  const transformedData = data.map(document => {
    //   const transformedDocument = { ...document._doc };
    //   transformedDocument.id = transformedDocument._id.toString();
    //   delete transformedDocument._id;
    //   delete transformedDocument.__v;
    //   delete transformedDocument.id;
    //   return transformedDocument;
    // });

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

//-------- extracting appName from URL -----//
    // extracting 'appName' parameter from 'request.params' object
        // Eg: in the URL : ../loyaltyprograms/BankApp, the parameter `appName` would be `BankApp` 
        // const { appName } = request.params;
    

