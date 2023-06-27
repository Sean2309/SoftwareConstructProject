const mongoose = require('mongoose');

const accuralFileFormSchema = new mongoose.Schema({
  index: Number,
  memberID: String,
  memberFirstName: String,
  memberLastName: String,
  transferDate: Date,
  amount: Number,
  referenceNumber: String,
  partnerCode: String
});

const accuralFileForm = mongoose.model('testaccurals', accuralFileFormSchema);

module.exports = accuralFileForm;