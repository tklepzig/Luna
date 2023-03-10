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
              socket.emit("keyboard-pressKey", connectionId, "N", null);
            }}
          >
            Next
          </Command>
          <button
            className="command shade1"
            onClick={() => {
              socket.emit("keyboard-pressKey", connectionId, "P", null);
            }}
          >
            Previous
          </button>
          <button
            className="command"
            onClick={() => {
              socket.emit("keyboard-pressKey", connectionId, "F", null);
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
