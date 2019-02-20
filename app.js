module.exports = function () {
  const connector = require('./db/connector.js');
  var express = require('express');
  var app = express();
  connector().then(function (x) {
    var createError = require('http-errors');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');

    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    var dashbooardRouter = require('./routes/auth/dashboard');
    const passport = require('passport')
    var loginRouter = require('./routes/login')(passport);
    const session = require('express-session')
    const MongoStore = require('connect-mongo')(session)


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({
      extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));





    require('./auth/passport')(passport)


    app.use(session({

      store: new MongoStore({
        db: x.db,
        ttl: 30 * 60 // = 30 minutos de sessão
      }),
      secret: '123', //configure um segredo seu aqui
      resave: false,
      saveUninitialized: false
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use('/', indexRouter, dashbooardRouter,loginRouter.router);
    app.use('/users', usersRouter);





    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });


  })
  return app;
}()