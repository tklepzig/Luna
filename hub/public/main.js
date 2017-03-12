var socket = io();

function makeid() {
    var id = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    return id;
}

var id;
if (!localStorage.connectionId) {
    id = makeid();
    localStorage.connectionId = id;
}
else {
    id = localStorage.connectionId;
}
$(".id").text(id);
var downEvent;
var moveEvent;
var upEvent;
var getMousePosition;
var getTouchCount;

if ("ontouchstart" in window) {
    downEvent = "touchstart";
    moveEvent = "touchmove";
    upEvent = "touchend";

    getMousePosition = function (e) {
        return { x: e.originalEvent.targetTouches[0].pageX, y: e.originalEvent.targetTouches[0].pageY };
    };
    getTouchCount = function (e) {
        return e.originalEvent.touches.length;
    }

} else if ("pointerdown" in window) {
    downEvent = "pointerdown";
    moveEvent = "pointermove";
    upEvent = "pointerup";

    getMousePosition = function (e) {
        return { x: e.pageX, y: e.pageY };
    };
    getTouchCount = function () {
        return 1;
    }
} else {
    downEvent = "mousedown";
    moveEvent = "mousemove";
    upEvent = "mouseup";

    getMousePosition = function (e) {
        return { x: e.pageX, y: e.pageY };
    };
    getTouchCount = function () {
        return 1;
    }
}

function executeSocketCommand(action, args) {
    var pingTimeout = setTimeout(function () {
        socket.close();
        socket.connect();
        action(args);
    }, 1000);

    socket.emit("ping", function () {
        clearTimeout(pingTimeout);
        action(args);
    });
}

$(document).on(upEvent, ".button[data-key]", function () {
    executeSocketCommand(function (e) {
        socket.emit('keyboard-pressKey', id, e.key);
    }, { key: $(this).data('key') });
});

$("#enableMouse").on(upEvent, function () {
    $("#mouse").removeClass('hidden');
    fullscreen.toggle($("#mouse").get(0));
    $("#mouse").toggleClass('fullscreen');
});

$("#enterFullscreen").on(upEvent, function () {
    fullscreen.toggle($("#main").get(0));
    $("#main").toggleClass('fullscreen');
});
(function () {
    var clickPoint = null;
    var downPoint = null;
    var touchCount = null;
    var firstMove;

    $("#mouse").on(downEvent, function (e) {
        touchCount = getTouchCount(e);
        var pos = getMousePosition(e);
        downPoint = clickPoint = {
            x: pos.x,
            y: pos.y
        };
        firstMove = true;

        e.stopPropagation();
        e.preventDefault();
        return false;
    });

    $("#mouse").on(moveEvent, function (e) {
        if (downPoint == null)
            return true;

        var pos = getMousePosition(e);

        var offset = {
            x: parseInt(pos.x - downPoint.x),
            y: parseInt(pos.y - downPoint.y)
        };

        if (firstMove) {
            offset.x = offset.x < 0
                ? -1
                : 1;
            offset.y = offset.y < 0
                ? -1
                : 1;
            firstMove = false;
        }

        downPoint = {
            x: pos.x,
            y: pos.y
        };

        switch (touchCount) {
            case 1:

                if (Math.abs(offset.x) > 2)
                    offset.x *= (offset.x.toString().length + 2);
                if (Math.abs(offset.y) > 2)
                    offset.y *= (offset.y.toString().length + 2);

                socket.emit('mouse-move', id, offset);

                // lily.tryRunHubCommand(function(hub) {hub.server.moveMouse(offset.x, offset.y); });

                break;
            case 2:
                var delta;
                if (Math.abs(offset.x) > 4) {
                    delta = Math.floor(Math.abs(offset.x) / 2) * 60;
                    if (offset.x > 0)
                        delta *= -1;

                    socket.emit('mouse-hWheel', id, delta);
                    // lily.tryRunHubCommand(function(hub) {hub.server.mouseHWheel(delta); });
                } else {
                    delta = Math.floor(Math.abs(offset.y) / 2) * 60;
                    if (offset.y > 0)
                        delta *= -1;

                    socket.emit('mouse-wheel', id, delta);
                    // lily.tryRunHubCommand(function(hub) {hub.server.mouseWheel(delta); });
                }

                break;
        }

        e.stopPropagation();
        e.preventDefault();
        return false;
    });

    $("#mouse").on(upEvent, function (e) {
        if (clickPoint != null && Math.abs(clickPoint.x - downPoint.x) < 2 && Math.abs(clickPoint.y - downPoint.y) < 2) {
            switch (touchCount) {
                case 1:
                    socket.emit('mouse-leftClick', id);
                    // lily.tryRunHubCommand(function(hub) {hub.server.leftMouseButtonClick(); });
                    break;
                case 2:
                    socket.emit('mouse-rightClick', id);
                    // lily.tryRunHubCommand(function(hub) {hub.server.rightMouseButtonClick(); });
                    break;
                case 3:
                    socket.emit('mouse-middleClick', id);
                    // lily.tryRunHubCommand(function(hub) {hub.server.middleMouseButtonClick(); });
                    break;
            }
        }

        downPoint = null;

        e.stopPropagation();
        e.preventDefault();
        return false;
    });
})();