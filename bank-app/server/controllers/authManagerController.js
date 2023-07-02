const authManagerController = require('express').Router();
const User = require('../models/user');

// Handle the POST request to authenticate a user
authManagerController.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    // Find the user by email
    User.findOne({ email })
    .then(user =>{
      if(user){
        if(user.password == password){
          response.json("Success")
        }else{
          response.json("The password is incorrect")
        }
      }else{
        response.json("User not found")
      }
    })
    //console.log('User not found');
    //return response.status(404).json({ message: 'User not found' });
      
   //console.log("Auth Successful")
    // Authentication successful, send a success response or perform any other actions
    //response.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error' });
  }
});

module.exports = authManagerController;
