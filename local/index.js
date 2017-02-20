'use strict';

if (process.argv.length < 4) {
    console.log("Please supply hub url and connection id!");
    process.exit(1);
}

var hubUrl = process.argv[2];
var connectionId = process.argv[3];

var socketIoClient = require('socket.io-client');

var port = 51108;
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

var socket = socketIoClient(hubUrl);

socket.on("connect", () => {
    console.log("Successfully connected to hub, waiting for commands...");
});

socket.on('media-playPause', function (id) {
    if (id != connectionId) {
        return;
    }

    luna.media.playPause();
});

socket.on('media-volumeUp', function (id) {
    if (id != connectionId) {
        return;
    }

    luna.media.volumeUp();
});

socket.on('media-volumeDown', function (id) {
    if (id != connectionId) {
        return;
    }

    luna.media.volumeDown();
});

socket.on('keyboard-pressKey', function (id, key, modifiers) {
    if (id != connectionId) {
        return;
    }

    luna.keyboard.pressKey(key, modifiers);
});

socket.on('mouse-move', function (id, offset) {
    if (id != connectionId) {
        return;
    }

    luna.mouse.move(offset);
});

socket.on('mouse-wheel', function (id, delta) {
    if (id != connectionId) {
        return;
    }

    luna.mouse.wheel(delta);
});

socket.on('mouse-hWheel', function (id, delta) {
    if (id != connectionId) {
        return;
    }

    luna.mouse.hWheel(delta);
});

socket.on('mouse-leftClick', function (id) {
    if (id != connectionId) {
        return;
    }

    luna.mouse.leftClick();
});

socket.on('mouse-rightClick', function (id) {
    if (id != connectionId) {
        return;
    }

    luna.mouse.rightClick();
});

socket.on('mouse-middleClick', function (id) {
    if (id != connectionId) {
        return;
    }

    luna.mouse.middleClick();
});

