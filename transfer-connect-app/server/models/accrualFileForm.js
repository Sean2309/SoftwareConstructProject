const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const accrualFileFormSchema = new mongoose.Schema({
  index: Number,
  memberID: String,
  memberFirstName: String,
  memberLastName: String,
  transferDate: Date,
  amount: Number,
  referenceNumber: String,
  partnerCode: String
});

const accrualFileForm = mongoose.model('testaccrual', accrualFileFormSchema);

module.exports = accrualFileForm;