const config = require('./utils/config');

// import middlewares 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loyaltyProgramQueryRouter = require("./routes/loyaltyProgramQueryRouter")



const app = express();

// connect to mongoDB cloud
mongoose.connect('mongodb+srv://Daniel:vLfmoyUKJ3Fy8dzx@transferconnect.0papjri.mongodb.net/TransferConnectDB?retryWrites=true&w=majority')
  .then((res) => console.log('connected'))
  .catch((err) => console.error('error'));

// enable CORS for all routes
// to allow request from different origins (domain, port etc)
app.use(cors());

// for purpose of parsing incoming requests 
app.use(express.json());

// routes based on bankapp
app.use('/api/loyaltyprograms/BankApp', loyaltyProgramQueryRouter('BankApp'));
app.use('/api/loyaltyprograms/DBS', loyaltyProgramQueryRouter('DBS'));
  

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})
