const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
  "Reference number": Date,
  "Transfer date": Int32,
  "Outcome code": String,
  "Amount": String,
})

const handback = mongoose.model('handback', transaction, 'handback');

module.exports = handback;