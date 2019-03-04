const connections = new Map();
function getUsersOnline(){
    //return usersActive;
    return Array.from( connections.values());
}
function addUser(user,socket){
    connections.set(user._id,socket)
//    usersActive.push(user);

}

function getByName(username){
    for(let socket of connections.values()){
        var user = socket.user ;
        if(user.username == username)
        {
            return socket;
        }  
    }
}

function removeUser(user){
    connections.delete(user._id);
    // usersActive.splice(usersActive.indexOf(user),1);

}




module.exports = {
    getUsersOnline,
    addUser,
    removeUser,
    getByName
}