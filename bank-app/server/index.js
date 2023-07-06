const config = require('./utils/config');

// import middlewares 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loyaltyProgramsRouter = require('./routes/loyaltyProgramsRouter');
const loyaltyProgramsController = require('./controllers/loyaltyProgramsController');


const app = express();

// connect to mongoDB cloud
mongoose.connect(config.MONGODB_URL).then((res) => console.log('connected')).catch((err) => console.error('error'))

// enable CORS for all routes
// to allow request from different origins (domain, port etc)
app.use(cors());

// for purpose of parsing incoming requests 
app.use(express.json());

// setup routes
app.use('/api/loyaltyPrograms', loyaltyProgramsRouter);

//update db
app.get('/update-loyalty-programs', (req, res) => {
    loyaltyProgramsController.updateLoyaltyPrograms()
      .then(() => {
        res.send('Loyalty programs updated successfully');
      })
      .catch((error) => {
        console.error('Error updating loyalty programs:', error);
        res.status(500).send('Error updating loyalty programs');
      });
  });

app.listen(3002, () => {
    console.log(`Server running on port ${config.PORT}`);
})