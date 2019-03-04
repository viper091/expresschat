const authmiddle = require('../../auth/middleware');
var express = require('express');
var router = express.Router();

router.get('/dashboard', authmiddle(), function (
    req, res, next) {
    return res.render('dashboard/review', {
        user: req.user
    })
})
router.get('/messenger', function ( req, res, next){

    return res.render('messenger', {'cUser' : req.user.username } );
  });
  
module.exports = router;