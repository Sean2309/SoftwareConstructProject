const config = require('./utils/config');

// import middlewares 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transferFormController = require('./controllers/transferFormController');
const authManagerController = require('./controllers/authManagerController');

const app = express();

// connect to mongoDB cloud
mongoose.connect(config.MONGODB_URL).then((res) => console.log('Database connected')).catch((err) => console.error('error'))

// enable CORS for all routes
// to allow request from different origins (domain, port etc)
app.use(cors());

// for purpose of parsing incoming requests 
app.use(express.json());

// setup routes
app.use('/api/transferFormSubmit', transferFormController)
app.use('/Login',authManagerController)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})