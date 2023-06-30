const loyaltyProgramQueryRouter = require('express').Router();
const loyaltyProgramQueryController = require('../controllers/loyaltyProgramQueryController');


// Router to handle GET request to /loyaltyprograms
loyaltyProgramQueryRouter.get('/', loyaltyProgramQueryController.getLoyaltyPrograms)

module.exports = loyaltyProgramQueryRouter;