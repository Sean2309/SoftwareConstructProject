const config = require('./utils/config');

// import middlewares 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transferconnectController = require('./routes/transactionEnquiryRouter');

const app = express();

// connect to mongoDB cloud
mongoose.connect(config.MONGODB_URL,  {
    dbName: 'bank-app', // Specify the database name, edit this accordingly
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res) => console.log('connected')).catch((err) => console.error('error'))


// enable CORS for all routes
// to allow request from different origins (domain, port etc)
app.use(cors());

// for purpose of parsing incoming requests 
app.use(express.json());

// setup routes
app.use('/transferconnect', transferconnectController)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})

module.exports = {app};
