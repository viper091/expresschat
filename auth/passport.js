const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const user = require('../db/users.js');

module.exports = function (passport) {
    //configuraremos o passport aqui

    passport.serializeUser(function (user, done) {
        console.log('serialize')
        done(null, user._id);
    
    });

    passport.deserializeUser(function (id, done) {
        console.log('deserialize')

        user.getUserById(id).then(x => {

            done(null, x);
        }).catch(err => {
            done(err, null);
        });

    });

    passport.use(
        'local',
        new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'}
        ,
        (username, password, done) => {
            console.log('local strat invoked');

            try {
                user.getUserByName(username).then(
                    user  => {

                        if (!user) {
                            return done(null, false)

                        }

                        bcrypt.compare(password, user.password, (err, isValid) => {
                            if (err) {
                                return done(err)
                            }
                            if (!isValid) {
                                return done(null, false)
                            }
                            return done(null, user)
                        })
                    }
                ).catch(err => {
                    return done(err);
                })

            } catch (err) {
                return err.message;
            }

        }
    ));


}