const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/dbtest';
// Database Name
const dbName = 'dbtest';
const client = new MongoClient(url);

async function connect() {
  // Connection URL

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

function getConn(){
  return  {db : client.db(dbName),
    client : client}
}

module.exports = {
  connect,
  getConn
};