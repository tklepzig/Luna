"use strict";

// Run with: node index.js http://localhost:8080/blubb 123456

if (process.argv.length < 4) {
  console.log("Please supply hub url and connection id!");
  process.exit(1);
}

var hubEndpoint = process.argv[2];
var connectionId = process.argv[3];

var port = 51108;
var os = require("os");

var luna;
var platform = os.platform();

if (/^win/.test(platform)) {
  luna = require("./windows/interaction.js");
} else if (/^linux/.test(platform)) {
  luna = require("./linux/interaction.js");
} else if (/^darwin/.test(platform)) {
  luna = require("./macos/interaction.js");
} else {
  console.log("Unsupported operating system.");
  process.exit(1);
}

const EventSource = require("eventsource");
const source = new EventSource(hubEndpoint);

source.addEventListener("welcome", ({ data }) => {
  const { clientId } = JSON.parse(data);
  console.log(
    `Successfully connected to hub. My client id: ${clientId}. Awaiting commands...`
  );
});

source.addEventListener("keyboard-pressKey", (message) => {
  const { id, key, modifiers } = JSON.parse(message.data);

  if (id != connectionId) {
    return;
  }

  luna.keyboard.pressKey(key, modifiers);
});

source.addEventListener("open", () => {
  console.log("Connecting to hub endpoint...");
});

source.addEventListener("error", (e) => {
  if (source.readyState == EventSource.CLOSED) {
    console.dir("Disconnected");
  } else if (source.readyState == EventSource.CONNECTING) {
    console.dir("Connecting...");
  } else console.error(e);
});

//socket.on("connect", function () {
//console.log("Successfully connected to hub, waiting for commands...");
//});

//socket.on("media-playPause", function (id) {
//if (id != connectionId) {
//return;
//}

//luna.media.playPause();
//});

//socket.on("media-volumeUp", function (id) {
//if (id != connectionId) {
//return;
//}

//luna.media.volumeUp();
//});

//socket.on("media-volumeDown", function (id) {
//if (id != connectionId) {
//return;
//}

//luna.media.volumeDown();
//});

//socket.on("keyboard-pressKey", function (id, key, modifiers) {
//if (id != connectionId) {
//return;
//}

//luna.keyboard.pressKey(key, modifiers);
//});

//socket.on("mouse-move", function (id, offset) {
//if (id != connectionId) {
//return;
//}

//luna.mouse.move(offset);
//});

//socket.on("mouse-wheel", function (id, delta) {
//if (id != connectionId) {
//return;
//}

//luna.mouse.wheel(delta);
//});

//socket.on("mouse-hWheel", function (id, delta) {
//if (id != connectionId) {
//return;
//}

//luna.mouse.hWheel(delta);
//});

//socket.on("mouse-leftClick", function (id) {
//if (id != connectionId) {
//return;
//}

//luna.mouse.leftClick();
//});

//socket.on("mouse-rightClick", function (id) {
//if (id != connectionId) {
//return;
//}

//luna.mouse.rightClick();
//});

//socket.on("mouse-middleClick", function (id) {
//if (id != connectionId) {
//return;
//}

//luna.mouse.middleClick();
//});
