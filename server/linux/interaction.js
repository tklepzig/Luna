'use strict';

var exec = require('child_process').exec;

module.exports.media = {
    playPause: function() {
        exec('xdotool key XF86AudioPlay');
    },
    volumeUp: function() {
        exec('xdotool key XF86AudioRaiseVolume');
    },
    volumeDown: function() {
        exec('xdotool key XF86AudioLowerVolume');
    }
};

module.exports.keyboard = {
    pressKey: function(key, modifiers) {
        //key
        key = key.toLowerCase();
        if (key === 'win') {
            key = 'super';
        }

        //modifiers
        var modifiersString = '';
        if (modifiers.length > 0) {
            for (var i = 0; i < modifiers.length; i++) {
                modifiers[i] = modifiers[i].toLowerCase();
                if (modifiers[i] === 'win') {
                    modifiers[i] = 'super';
                }

                modifiersString += modifiers[i] + '+';
            }
        }

        console.log('xdotool key ' + modifiersString + key);
        exec('xdotool key ' + modifiersString + key);
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
