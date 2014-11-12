var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sentiment = require("sentiment");

var d3 = require("d3");

var routes = require('./routes/index');
var users = require('./routes/users');
var viz = require('./routes/viz');

var app = express();
console.log("Starting");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/viz', viz);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

//Seteo Socket.io
var io = require('socket.io').listen(8079);


//ACA INTENTO GUARDAR UN NICK Y NO ME SALIÓ

io.sockets.on('connection', function (socket) {
  console.log('Client conected');

    socket.on('disconnect', function(){
    console.log('Client disconnected');
  });

  socket.on('set_nickname',function(nickname, callback){
    console.log('trying to set nickname ' + nickname);

    callback(true)
  });
// HASTA ACÁ


  socket.emit('news', "Conectado");
  socket.on('analizar', function (data) {
    mensajes = [];
    score = [];
    for (i in data) {
        mensajes[mensajes.length] = data[i];
        var sco = 0;
        sentiment(data[i], function (err, result) {
            sco = result.score;
        });

        score[score.length] = sco;
    };
    
    socket.emit('devolverDatos', {mensajes: mensajes, score: score});
  });
});
