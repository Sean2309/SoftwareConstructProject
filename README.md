# 50.003_ESC_Project

##Changing Database

To change MongoDB server, edit MONGODB_URL in .env. 

Edit index.js with the specific database name. 
```javascript
mongoose.connect(config.MONGODB_URL,  {
    dbName: 'transferconnect', // Specify the database name, edit this accordingly
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res) => console.log('connected')).catch((err) => console.error('error'))
```

Edit Schemas and collection name in models/transactionEnquiryModels.js
```javascript
//edit fields according to handback file 
const transaction = new Schema({
  "Reference number": String,
  "Transfer date": Date,
  "Outcome code": String,
  "Amount": Number,
})

//change 'handback' to collection name
const handback = mongoose.model('handback', transaction, 'handback'); 
```

##Localhost

To change localhost ports and links, edit PORT and TRANSFER_CONNECT_API_URL in .env.

Currently runs with link:
http://localhost:3002/transferconnect/
