'use strict';

var edge = require('edge');
var path = require('path');
var dllFilePath = '/luna.windows/bin/Release/luna.windows.dll';

module.exports.media = {
    playPause: function() {
        edge.func({
            assemblyFile: path.resolve(__dirname + dllFilePath),
            typeName: 'luna.windows.Media',
            methodName: 'PlayPause'
        })();
    },
    volumeUp: function() {
        edge.func({
            assemblyFile: path.resolve(__dirname + dllFilePath),
            typeName: 'luna.windows.Media',
            methodName: 'VolumeUp'
        })();
    },
    volumeDown: function() {
        edge.func({
            assemblyFile: path.resolve(__dirname + dllFilePath),
            typeName: 'luna.windows.Media',
            methodName: 'VolumeDown'
        })();
    }
};
