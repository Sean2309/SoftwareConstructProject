const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
  "Reference number": String,
  "Outcome code": String,
  "Outcome updated": Boolean
})

const handback = mongoose.model('transactions', transaction);

module.exports = handback;