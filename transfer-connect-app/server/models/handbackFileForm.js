const mongoose = require('mongoose');

const handbackFileFormSchema = new mongoose.Schema({
    transferDate: Date,
    amount: Number,
    referenceNumber: String,
    outcomeCode: String
});

const handbackFileForm = mongoose.model('testhandbacks', handbackFileFormSchema);

module.exports = handbackFileForm;