const MongoClient = require('mongodb').MongoClient;

const connection_str = 'mongodb://0.0.0.0:27017/';

const client = new MongoClient(connection_str);
const dbName = 'Transactions'

var db = null;

try {
    db = client.db(dbName);
} catch (error) {
    console.error("database connection failed. " + error);
}   

async function cleanup() {
    await client.close();
}


module.exports = { db, cleanup } ;