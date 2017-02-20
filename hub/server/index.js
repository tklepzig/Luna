'use strict';

var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketIo = require('socket.io')(http);
var path = require('path');


app.use('/', express.static(path.resolve(__dirname + "/../public")));

socketIo.on('connection', function(socket) {
    var clientIp = socket.request.connection.remoteAddress;
    console.log('Client connected:\t' + clientIp);
    socket.on('disconnect', function() {
        console.log('Client disconnected:\t' + clientIp);
    });

    //client functions
    socket.on('media-playPause', function(id) {
        socket.broadcast.emit("media-playPause", id);
    });

    socket.on('media-volumeUp', function(id) {
        socket.broadcast.emit("media-volumeUp", id);
    });

    socket.on('media-volumeDown', function(id) {
        socket.broadcast.emit("media-volumeDown", id);
    });

    socket.on('keyboard-pressKey', function(id, key, modifiers) {
        socket.broadcast.emit("keyboard-pressKey", id, key, modifiers);
    });

    socket.on('mouse-move', function(id, offset) {
        socket.broadcast.emit("mouse-move", id, offset);
    });

    socket.on('mouse-wheel', function(id, delta) {
        socket.broadcast.emit("mouse-wheel", id, delta);
    });

    socket.on('mouse-hWheel', function(id, delta) {
        socket.broadcast.emit("mouse-hWheel", id, delta);
    });

    socket.on('mouse-leftClick', function(id) {
        socket.broadcast.emit("mouse-leftClick", id);
    });

    socket.on('mouse-rightClick', function(id) {
        socket.broadcast.emit("mouse-rightClick", id);
    });

    socket.on('mouse-middleClick', function(id) {
        socket.broadcast.emit("mouse-middleClick", id);
    });
});


http.listen(port, function() {
    console.log('listening on *:' + port);
});
