import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { enterFullscreen } from "../../fullscreen";
import { Command } from "../Command";
import { Panel, CommandBar } from "./styles";

const socket = io();

const generateId = () => {
  let id = "";
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return id;
};

export const Main = () => {
  const [connectionId, setConnectionId] = useState<string>();

  useEffect(() => {
    if (!localStorage.connectionId) {
      const id = generateId();
      localStorage.connectionId = id;
      setConnectionId(id);
    } else {
      setConnectionId(localStorage.connectionId);
    }
  }, []);

  return (
    <Panel>
      <header />
      <article>
        <CommandBar>
          <Command
            className="shade2"
            onTap={() => {
              console.dir("next");
              socket.emit("keyboard-pressKey", "123456", "N", null);
            }}
          >
            Next
          </Command>
          <button
            className="command shade1"
            onClick={() => {
              console.dir("prev");
              socket.emit("keyboard-pressKey", "123456", "P", null);
            }}
          >
            Previous
          </button>
          <button
            className="command"
            onClick={() => {
              socket.emit("keyboard-pressKey", "123456", "F", null);
            }}
          >
            Fullscreen
          </button>
        </CommandBar>
      </article>
      <footer className="command-bar">
        <button
          className="command shade2"
          onClick={() => {
            enterFullscreen();
          }}
        />
        <div className="command spacer" />
        {connectionId}
      </footer>
    </Panel>
  );
};
