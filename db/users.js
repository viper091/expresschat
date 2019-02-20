const connector = require('./connector.js');
const ObjectID = require('mongodb').ObjectID;
async function getUsers(){
    try{
        
        const conn = await connector();
        var db = conn.db;
        var client = conn.client;
        console.log('connected to db');
        return await db.collection('users').find({}).toArray();

    }
    catch(ex){
        throw `Failed to find users ${ex.message}`;
    }
    finally{
        client.close();

        console.log('client closed')
    }
}



async function addUser(json){
    try{
        
        const conn = await connector();
        var db = conn.db;
        var client = conn.client;
        console.log('connected to db');
        return db.collection('users').insertOne(json);

    }
    catch(ex){
        throw `Failed to find users ${ex.message}`;
    }
    finally{
        client.close();

        console.log('client closed')
    }
}

async function removeUser(id){
    try{
        
        const conn = await connector();
        var db = conn.db;
        var client = conn.client;
        console.log('connected to db');
        return db.collection('users').deleteOne({_id:new ObjectID(id)})

    }
    catch(ex){
        throw `Failed to find users ${ex.message}`;
    }
    finally{
        client.close();

        console.log('client closed')
    }
}

async function getUserById(id){
    try{
        
        const conn = await connector();
        var db = conn.db;
        var client = conn.client;
        console.log('connected to db');
        return db.collection('users').findOne({_id:new ObjectID(id)})

    }
    catch(ex){
        throw `Failed to find user ${ex.message}`;
    }
    finally{
        client.close();

        console.log('client closed')
    }
}

async function getUserByName(name){
    try{
        
        const conn = await connector();
        var db = conn.db;
        var client = conn.client;
        console.log('connected to db');
        return db.collection('users').findOne({username:name})

    }
    catch(ex){
        throw `Failed to find user ${ex.message}`;
    }
    finally{
        client.close();

        console.log('client closed')
    }
}


module.exports = {
    getUsers,
    addUser,
    removeUser,
    getUserById,
    getUserByName
}