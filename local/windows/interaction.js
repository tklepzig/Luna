'use strict';

var path = require('path');
var edge = require('edge');
var exec = require('child_process').exec;
var dllFilePath = path.resolve(__dirname + '/luna.windows/bin/Release/luna.windows.dll');

module.exports.media = {
    playPause: function() {
        exec('python ' + path.resolve(__dirname + '/media.py') + ' playpause');
    },
    volumeUp: function() {
        exec('python ' + path.resolve(__dirname + '/media.py') + ' volumeup');
    },
    volumeDown: function() {
        exec('python ' + path.resolve(__dirname + '/media.py') + ' volumedown');
    }
};


module.exports.keyboard = {
    pressKey: function(key, modifiers) {
        //TODO: add modifier support
        exec('python ' + path.resolve(__dirname + '/keyboard.py') + ' ' + key);
    }
};


module.exports.mouse = {
    move: function(offset) {
         edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'Move'
        })(offset);
        // exec('python ' + path.resolve(__dirname + '/mouse.py') + ' move ' + offset.x + ' ' + offset.y);
    },
    wheel: function(delta) {
        exec('python ' + path.resolve(__dirname + '/mouse.py') + ' wheel ' + delta);
    },
    hWheel: function(delta) {
        exec('python ' + path.resolve(__dirname + '/mouse.py') + ' hwheel ' + delta);
    },
    leftClick: function() {
        exec('python ' + path.resolve(__dirname + '/mouse.py') + ' click left');
    },
    rightClick: function() {
        exec('python ' + path.resolve(__dirname + '/mouse.py') + ' click right');
    },
    middleClick: function() {
        exec('python ' + path.resolve(__dirname + '/mouse.py') + ' click middle');
    }
};
