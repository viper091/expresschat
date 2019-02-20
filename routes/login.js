var express = require('express');
var router = express.Router();
var user = require('../db/users.js');
const authmiddle = require('../auth/middleware');

router.get('/login', function (req, res, next) {

    if(req.isAuthenticated()){
        return res.redirect('/dashboard');

    }

    if (req.query.fail)
        res.render('auth/login', {
            message: 'Usuário e/ou senha incorretos!'
        });
    else
        res.render('auth/login', {
            message: null
        });
});

router.get('/logout', function (req, res, next) {

    req.logOut();

    res.send('logout realizedo com sucesso');
})






module.exports = function (passport) {




    router.get('/teste', authmiddle(), function (req, res) {
        res.send('okay');
    });
    router.post('/login/submit',
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login?fail=true',


        }));

    return {
        router
    }

};