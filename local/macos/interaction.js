'use strict';

var exec = require('child_process').exec;
var robot = require("robotjs");

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

        exec(`osascript -e 'tell application "System Events" to keystroke "${key}"'`);
        // exec(`osascript -e 'tell application "System Events" to keystroke "${key}" using {control down, shift down}'`);
        // exec('xdotool key ' + modifiersString + key);
    }
};

module.exports.mouse = {
    move: function (offset) {
        var mouse = robot.getMousePos();
        robot.moveMouse(mouse.x + offset.x, mouse.y + offset.y);
    },
    wheel: function (delta) {
        robot.scrollMouse(0, delta);
    },
    hWheel: function (delta) {
        robot.scrollMouse(delta, 0);
    },
    leftClick: function () {
        robot.mouseClick("left");
    },
    rightClick: function () {
        robot.mouseClick("right");
    },
    middleClick: function () {
        robot.mouseClick("middle");
    }
};
