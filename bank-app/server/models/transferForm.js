const mongoose = require('mongoose');

const transferFormSchema = new mongoose.Schema({
  membershipId: String,
  membershipName: String,
  transferDate: String,
  transferAmount: Number,
  referenceNumber: String,
  partnerCode: String,
});

const TransferForm = mongoose.model('TransferForm', transferFormSchema);

module.exports = TransferForm;