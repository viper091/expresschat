var userdb = require('../db/users');
var socketclients = require('./socketclients');
// const session = require('express-session');

module.exports = function (http, sessionStore) {
    var io = require('socket.io')(http);

    io.on('connection', function (socket) {
        // console.log('a user connected');
        //console.log(socket.request.session)
        //console.log(socket.request.session.passport.user);

        if (typeof socket.request.session.passport === 'undefined') {
            socket.emit('redirect', '/login');
            socket.disconnect();
            console.warn('user disconn')
            return;
        }



        if (typeof socket.user === 'undefined') {
            console.log('attacking user to socket')
            var userid = socket.request.session.passport.user;
            userdb.getUserById(userid).then(user => {

                socket.user = user;

                socketclients.addUser(user,socket);
                console.log(socketclients.getUsersOnline().map(x => x.user.username))
                io.emit('online', socketclients.getUsersOnline().map(x => x.user.username));


            });
        }


        console.log('some val', require('../test').getSomeVal());
        // console.log( socketclients.getUsersOnline());

        socket.on('disconnect', function () {
            console.log('dis')

            socketclients.removeUser(socket.user);
            delete socket.user;
            console.log('user socket removed ', socket.user)

            io.emit('online', socketclients.getUsersOnline().map(x => x.user.username));

        });





        socket.on('toServer', function (msg) {
            io.emit('toClient', msg);
        });
        socket.on('createprivate', function(userbname){
            var roomname = userbname + socket.user.username;
            socket.join(roomname);
            var socketb = socketclients.getByName(userbname);
            socketb.join(roomname);

            socket.in(roomname).emit('toClient', 'okay');

            console.log('creating room ', roomname);

        })


        socket.on('fromUser', function (room, msg) {

        })
    });

    return io;
}