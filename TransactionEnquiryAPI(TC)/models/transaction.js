const db = require('./db.js').db;
const variable_collection = require('../variables/VariableCollection.js');


const collectionName = 'transactions'


//edit later, can use caching instead of global variables

//checkStatus
/** 
function checkStatus(array_ids){
    if (array_ids.length > 0 && Array.isArray(array_ids)){
        for (let id of array_ids){
            if (variable_collection.getVariableStatus(id) == false){
                console.log(false);
            }
            else{
                console.log(true);
            }
        }
    }
    
}*/

//getStatus
async function getStatus(id_list){
    try {
        console.log(id_list);
        let status_list = {};
        const collection = db.collection (collectionName);
        for (let id of id_list){
            console.log(id);
            let status = await collection.findOne({referencenumber: id},{projection: {date: 0, amount:0, _id:0, referencenumber:0}});
            console.log(status);
            status_list[id] = status.outcomecode;
            console.log(status_list);
        };
        return status_list;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
}
}

//add transaction (for testing)
async function insertOne(transaction){
    try {
        const collection = db.collection (collectionName);
        await collection.insertOne(transaction);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
}
}


module.exports = { getStatus, insertOne };