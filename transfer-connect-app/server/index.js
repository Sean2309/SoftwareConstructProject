const config = require('./utils/config');

// import middlewares 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transferconnect_LPQ = require('./controllers/loyaltyProgramQueryController');



const app = express();

// connect to mongoDB cloud
mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://danielyuen:1234@test.j9ugyp5.mongodb.net/testdb?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// enable CORS for all routes
// to allow request from different origins (domain, port etc)
app.use(cors());

// for purpose of parsing incoming requests 
app.use(express.json());


app.use('/', transferconnect_LPQ)
  

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})

console.log(`hi`)