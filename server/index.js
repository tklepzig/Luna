'use strict';

var config = require('./config.json')[process.env.NODE_ENV || 'development'];
var port = process.env.PORT || config.port;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketIo = require('socket.io')(http);
var path = require('path');
var os = require('os');

var luna;
var platform = os.platform();

if (/^win/.test(platform)) {
    luna = require('./windows/interaction.js');
} else if (/^linux/.test(platform)) {
    luna = require('./linux/interaction.js');
} else {
    console.log('Unsupported operating system.');
    process.exit(1);
}

console.log('using ' + config.publicFilePath + ' to serve public files');
app.use('/', express.static(path.resolve(__dirname + config.publicFilePath)));
app.get('/', function(request, response) {
    response.sendFile(path.resolve(__dirname + config.publicFilePath + '/index.html'));
});

socketIo.on('connection', function(socket) {
    var clientIp = socket.request.connection.remoteAddress;
    console.log('Client connected:\t' + clientIp);
    socket.on('disconnect', function() {
        console.log('Client disconnected:\t' + clientIp);
    });

    //client functions
    socket.on('media-playPause', function() {
        luna.media.playPause();
    });

    socket.on('media-volumeUp', function() {
        luna.media.volumeUp();
    });

    socket.on('media-volumeDown', function() {
        luna.media.volumeDown();
    });

    socket.on('keyboard-pressKey', function(key, modifiers) {
        luna.keyboard.pressKey(key, modifiers);
    });

    socket.on('mouse-move', function(offset) {
        luna.mouse.move(offset);
    });

    socket.on('mouse-wheel', function(delta) {
        luna.mouse.wheel(delta);
    });

    socket.on('mouse-hWheel', function(delta) {
        luna.mouse.hWheel(delta);
    });

    socket.on('mouse-leftClick', function() {
        luna.mouse.leftClick();
    });

    socket.on('mouse-rightClick', function() {
        luna.mouse.rightClick();
    });

    socket.on('mouse-middleClick', function() {
        luna.mouse.middleClick();
    });
});


http.listen(port, function() {
    console.log('listening on *:' + port);
});
