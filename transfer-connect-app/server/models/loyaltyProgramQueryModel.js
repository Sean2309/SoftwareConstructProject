const mongoose = require('mongoose');


//Schema tells Mongoose how loyaltyProgramQueryModel objects are stored in Db
const loyaltyProgramQuerySchema = new mongoose.Schema({
  programID: String,
  programName: String,
  currencyName: String,
  processingTime: String,
  description: String,
  enrollmentLink: String,
  tncLink: String
},{ collection: 'loyaltyProgramProviders' });
//{collection:`loyaltyProgramQueryModel` } 


const loyaltyProgramQueryModel = mongoose.model('loyaltyProgramQueryModel', loyaltyProgramQuerySchema);
module.exports = loyaltyProgramQueryModel;


