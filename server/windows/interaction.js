'use strict';

var edge = require('edge');
var path = require('path');
var dllFilePath = path.resolve(__dirname + '/luna.windows/bin/Release/luna.windows.dll');

module.exports.media = {
    playPause: function() {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Media',
            methodName: 'PlayPause'
        })();
    },
    volumeUp: function() {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Media',
            methodName: 'VolumeUp'
        })();
    },
    volumeDown: function() {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Media',
            methodName: 'VolumeDown'
        })();
    }
};


module.exports.keyboard = {
    pressKey: function(key, modifiers) {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Keyboard',
            methodName: 'PressKey'
        })({
            key: key,
            modifiers: modifiers
        });
    }
};


module.exports.mouse = {
    move: function(offset) {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'Move'
        })(offset);
    },
    wheel: function(delta) {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'Wheel'
        })(delta);
    },
    hWheel: function(delta) {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'HWheel'
        })(delta);
    },
    leftClick: function() {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'LeftClick'
        })();
    },
    rightClick: function() {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'RightClick'
        })();
    },
    middleClick: function() {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Mouse',
            methodName: 'MiddleClick'
        })();
    }
};
