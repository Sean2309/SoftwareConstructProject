const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const handbackFileFormSchema = new mongoose.Schema({
    transferDate: Date,
    amount: Number,
    referenceNumber: String,
    outcomeCode: String
});

module.exports = handbackFileFormSchema;