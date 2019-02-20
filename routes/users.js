var express = require('express');
var router = express.Router();
var user = require('../db/users.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  user.getUsers().then(
    users => {
      res.render('users/all', 
      {
        'title' :'aa',
        'users' : users
      }
    );
    }
  ).catch( err =>{
    console.log(err);


  })




});


router.get('/add', function(req, res, next) {
  res.render('users/add', 
    {
    }
  );

});

router.post('/submit', function(req,res,next){

  user.addUser({
   'name': req.body.name,
    'age':req.body.age
  }
  ).then(function(x){

    res.redirect('/users');
  });
});


router.get('/remove/:id', function(req,res,next){

  user.removeUser(req.param('id')).then(x=>
    {
 
      res.redirect('/users');
    });

});


router.get('/login', function(req,res,next){

});

router.post('/login', function(req,res,next){
});

router.post('/logout',  function(req,res,next){})





module.exports = router;
