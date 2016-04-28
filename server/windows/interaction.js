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
    pressKey: function(key) {
        edge.func({
            assemblyFile: dllFilePath,
            typeName: 'luna.windows.Keyboard',
            methodName: 'PressKey'
        })(key);
    }
};