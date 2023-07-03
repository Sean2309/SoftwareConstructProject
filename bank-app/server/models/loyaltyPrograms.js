const mongoose = require('mongoose');

const loyaltyProgramsSchema = new mongoose.Schema({
    programID:String,
    programName:String,
    currencyName:String,
    processingTime:String,
    description:String,
    enrollmentLink:String,
    tncLink:String,
    format:String
});

const LoyaltyPrograms = mongoose.model('loyaltyprograms', loyaltyProgramsSchema);

module.exports = LoyaltyPrograms;