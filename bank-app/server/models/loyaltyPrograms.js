const mongoose = require('mongoose');

const loyaltyProgramsSchema = new mongoose.Schema({
    _id: String,
    programID:String,
    programName:String,
    currencyName:String,
    processingTime:String,
    description:String,
    enrollmentLink:String,
    tncLink:String

});

const LoyaltyPrograms = mongoose.model('loyaltyprograms', loyaltyProgramsSchema);

module.exports = LoyaltyPrograms;