require('dotenv').config()
const MONGODB_URL = 'mongodb+srv://test:test@test.j9ugyp5.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT

module.exports = {
    MONGODB_URL, PORT
}