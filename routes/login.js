var express = require('express');
var router = express.Router();
var user = require('../db/users.js');
const authmiddle = require('../auth/middleware');
const bcrypt = require('bcrypt');
router.get('/login', function (req, res, next) {

    if (req.isAuthenticated()) {
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

router

router.get('/logout', function (req, res, next) {

    req.logOut();

    res.send('logout realizedo com sucesso');
})
router.get('/register', function (req, res, next) {
    return res.render('auth/register', {
        message: ''
    });
})
router.post('/login/create', function (req, res, next) {
    bcrypt.hash(req.body.password, 10).then(cryptpass => {
        user.addUser({
            username: req.body.username,
            password: cryptpass,
            email: req.body.email
        }).then(userresult => {

                console.log('res ', userresult.result);

                res.redirect('/login');
            }

        ).catch(err => {
            res.render('error', {
                message: 'failed to create acc',
                error: err
            });
        })
    });
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