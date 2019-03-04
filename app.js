const connector = require('./db/connector.js');
var express = require('express');
var app = express();
var test = require('./test')
function appRun(x, http) {
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
  var MongoStore = require('connect-mongo')(session)


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

  app.use('/scripts', express.static(__dirname + '/node_modules/socket.io-client/dist/'));





  require('./auth/passport')(passport)
  const sessionStore = new MongoStore({
    db: x.db,
    ttl: 30 * 60 // = 30 minutos de sessão
  });

  const sessionV = session({

    store: sessionStore,
    secret: '123', //configure um segredo seu aqui
    resave: false,
    saveUninitialized: false
  })
  app.use(sessionV);
  
  var passInit = passport.initialize();
  var passSess = passport.session();
  app.use(passInit);
  app.use(passSess);

  app.use('/', indexRouter, dashbooardRouter, loginRouter.router);
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


  var io = require('./msg/socket')(http, sessionStore);
  var cookieParse = cookieParser();

  io.use(function (socket, next) {
    cookieParse(socket.request, socket.request.res, next);
  });
  io.use(function (socket, next) {
    socket.request.originalUrl = socket.request.url;
    sessionV(socket.request, socket.request.res, next);
  });
  io.use(function (socket, next) {
    cookieParse(socket.request, socket.request.res, next);
  });
  io.use(function (socket, next) {
    passInit(socket.request, socket.request.res, next);
  });

  
  test.setSomeVal(10);
  return io;
}

async function startApp(http){
  var x = await connector.connect();
  var io = await appRun(x, http);
  return io;
}

function getApp(){
  return app;
}
module.exports = {
  startApp,
  getApp
}