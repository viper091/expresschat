const connector = require('./connector.js');
const ObjectID = require('mongodb').ObjectID;

const conn = connector.getConn();


async function newChat(usera,userb){

}
async function getChatByUsers(usera_id, userb_id){

}

module.exports = {
    newChat,
    getChatByUsers
}