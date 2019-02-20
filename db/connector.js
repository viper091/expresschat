const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function connect() {
  // Connection URL
  const url = 'mongodb://localhost:27017/dbtest';
  // Database Name
  const dbName = 'dbtest';
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();
    console.log('db connected')
    return  {db : client.db(dbName),
            client : client}
            ;
  } catch (err) {
    console.log(err.stack);
  }


}

module.exports = connect;