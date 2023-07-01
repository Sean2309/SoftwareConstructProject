const axios = require('axios');
const mongoose = require('mongoose');
const LoyaltyPrograms = require('../models/loyaltyPrograms');

const updateLoyaltyPrograms = async () => {
    try {
      const response = await axios.get('http://example.com/api/loyalty-programs');
      const data = response.data; 
  
      await LoyaltyPrograms.deleteMany({});
      await LoyaltyPrograms.create(data);
  
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      mongoose.connection.close();
    }
  };
  
  module.exports = {
    updateLoyaltyPrograms,
  };
