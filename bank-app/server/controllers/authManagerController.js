const User = require('../models/user');

class AuthManagerController {

// Handle the POST request to authenticate a user
  userAuthentication = async (request, response) => {
    try {
      const { email, password } = request.body;

      // Find the user by email
      // TODO: Implement security features, e.g. hash password
      User.findOne({ email })
        .then(user => {
          if (user) {
            if (user.password == password) {
              response.json("Success")
            } else {
              response.json("The password is incorrect")
            }
          } else {
            response.json("User not found")
          }
        })
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    }
  }
}

const authManagerController = new AuthManagerController();

module.exports = authManagerController;