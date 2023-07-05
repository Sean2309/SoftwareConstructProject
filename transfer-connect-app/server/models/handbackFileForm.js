const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const handbackFileFormSchema = new mongoose.Schema({
  transferDate: String,
  transferAmount: Number,
  referenceNumber: String,
  outcomeCode: String
});

module.exports = handbackFileFormSchema;