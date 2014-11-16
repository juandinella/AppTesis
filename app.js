var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sentiment = require("sentiment");
var d3 = require("d3");

var server = require('http').Server(app);

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

//var io = require('socket.io').listen(8079);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    var idUsuario;

    /*
    * Quienes se subscriban como viz recibiran los nuevos users o datos
    */
    socket.on('subscripcionViz', function (a) {
    socket.join('viz');
    socket.emit('news','Subscripto como viz');
    });

    /*
    * Recibo la foto y la envio a la viz
    */
    socket.on('nuevoUser', function (foto) {
        //Genero y envio un id de usuario alfanumerico aleatorio
        idUsuario = Math.random().toString(36).slice(2);
        socket.emit('idUsuario', idUsuario);

        io.sockets.in('viz').emit('news','Nuevo User!');
        io.sockets.in('viz').emit('devolverFoto', {usuario: idUsuario, foto: foto});
    });

    /*
    * Recibo toda la data del feed y envio los scores correspondientes a la viz
    */
    socket.on('analizar', function (data) {
        score = [];
        for (i in data) {
            var sco = 0;
            sentiment(data[i], function (err, result) {
                sco = result.score;
            });

            score[score.length] = sco;
        };
        io.sockets.in('viz').emit('devolverDatos', {score: score, usuario: idUsuario});
    });

    socket.on('disconnect', function () {
        if(typeof idUsuario != 'undefined'){
            io.sockets.in('viz').emit('desconectado', idUsuario);
        }
    });

});
