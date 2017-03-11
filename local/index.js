if (process.argv.length < 4) {
    console.log("Please supply hub url and connection id!");
    process.exit(1);
}

const hubUrl = process.argv[2];
const connectionId = process.argv[3];

const socketIoClient = require("socket.io-client");
const os = require("os");

let luna;
const platform = os.platform();

if (/^win/.test(platform)) {
    luna = require("./windows/interaction.js");
} else if (/^linux/.test(platform)) {
    luna = require("./linux/interaction.js");
} else {
    console.log("Unsupported operating system.");
    process.exit(1);
}

const socket = socketIoClient(hubUrl);

socket.on("connect", () => {
    console.log("Successfully connected to hub, waiting for commands...");
});

socket.on("media-playPause", (id) => {
    if (id != connectionId) {
        return;
    }

    luna.media.playPause();
});

socket.on("media-volumeUp", (id) => {
    if (id != connectionId) {
        return;
    }

    luna.media.volumeUp();
});

socket.on("media-volumeDown", (id) => {
    if (id != connectionId) {
        return;
    }

    luna.media.volumeDown();
});

socket.on("keyboard-pressKey", (id, key, modifiers) => {
    if (id != connectionId) {
        return;
    }

    luna.keyboard.pressKey(key, modifiers);
});

socket.on("mouse-move", (id, offset) => {
    if (id != connectionId) {
        return;
    }

    luna.mouse.move(offset);
});

socket.on("mouse-wheel", (id, delta) => {
    if (id != connectionId) {
        return;
    }

    luna.mouse.wheel(delta);
});

socket.on("mouse-hWheel", (id, delta) => {
    if (id != connectionId) {
        return;
    }

    luna.mouse.hWheel(delta);
});

socket.on("mouse-leftClick", (id) => {
    if (id != connectionId) {
        return;
    }

    luna.mouse.leftClick();
});

socket.on("mouse-rightClick", (id) => {
    if (id != connectionId) {
        return;
    }

    luna.mouse.rightClick();
});

socket.on("mouse-middleClick", (id) => {
    if (id != connectionId) {
        return;
    }

    luna.mouse.middleClick();
});

