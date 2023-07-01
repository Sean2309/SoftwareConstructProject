const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

//edit fields according to handback file 
const transaction = new Schema({
  "Reference number": String,
  "Transfer date": String,
  "Outcome code": String,
  "Amount": String,
})

const handback = mongoose.model('handback', transaction, 'handback');

module.exports = handback;