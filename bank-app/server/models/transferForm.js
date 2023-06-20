const mongoose = require('mongoose');

const transferFormSchema = new mongoose.Schema({
  cardholderName: String,
  membershipNo: String,
  transferAmount: Number
});

const TransferForm = mongoose.model('TransferForm', transferFormSchema);

module.exports = TransferForm;