'use strict';

var exec = require('child_process').exec;

module.exports.media = {
    playPause: function () {
        exec('xdotool key XF86AudioPlay');
    },
    volumeUp: function () {
        exec('xdotool key XF86AudioRaiseVolume');
    },
    volumeDown: function () {
        exec('xdotool key XF86AudioLowerVolume');
    }
};

module.exports.keyboard = {
    pressKey: function (key, modifiers) {
        //key
        key = key.toLowerCase();
        if (key === 'win') {
            key = 'super';
        }

        //modifiers
        var modifiersString = "";
        if (modifiers && modifiers.length > 0) {
            modifiers = modifiers.replace(/win/g, "super");
            modifiersString = modifiers + "+";
        }

        exec('xdotool key ' + modifiersString + key);
    }
};

module.exports.mouse = {
    move: function (offset) {
        exec('xdotool mousemove_relative -- ' + offset.x + ' ' + offset.y);
    },
    wheel: function (delta) {
        if (delta > 0) {
            for (var i = 0; i < delta / 60; i++) {
                exec('xdotool click --clearmodifiers 4');
            }
        }
        else {
            for (var i = 0; i < delta * -1 / 60; i++) {
                exec('xdotool click --clearmodifiers 5');
            }
        }
    },
    hWheel: function (delta) {
        if (delta > 0) {
            for (var i = 0; i < delta / 60; i++) {
                exec('xdotool click --clearmodifiers 6');
            }
        }
        else {
            for (var i = 0; i < delta * -1 / 60; i++) {
                exec('xdotool click --clearmodifiers 7');
            }
        }
    },
    leftClick: function () {
        exec('xdotool click 1');
    },
    rightClick: function () {
        exec('xdotool click 3');
    },
    middleClick: function () {
        exec('xdotool click 2');
    }
};


//lock workstation: gnome-screensaver-command -l
//start screensaver: gnome-screensaver-command -a
//stop screensaver: gnome-screensaver-command -d

//mouse: xdotool click 1/2/3, xdotool mousemove x y
//type text: xdotool type '<text>'
//scroll up: xdotool click --clearmodifiers 4
//scroll down: xdotool click --clearmodifiers 5
//--clearmodifiers: löscht alle modifiers beim Ausführen (riehenfolge ist wichtig!)
