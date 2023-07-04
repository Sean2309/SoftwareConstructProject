
const loyaltyProgramQueryController = require('../controllers/loyaltyProgramQueryController');



const loyaltyProgramQueryRouter = (appName) => {
  const router = require('express').Router();

  // Router to handle GET request to /api/loyaltyprogramsBankApp
  router.get('/', (req, res) => {
    // Call the getLoyaltyPrograms function on the controller with the appName: BankApp
    loyaltyProgramQueryController.getLoyaltyPrograms(req, res, appName);
    console.log(`The router is reading the appName:`, appName);
  });

  return router;
};

module.exports = loyaltyProgramQueryRouter;