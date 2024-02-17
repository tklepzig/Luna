import { useEffect, useState } from "react";
import { enterFullscreen } from "../../fullscreen";
import { Command } from "../Command";
import { Panel, CommandBar } from "./styles";

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
            style={{ gridColumn: "span 2" }}
            className="shade2"
            onTap={() => {
              fetch(`/key`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: connectionId, key: "N" }),
              });
            }}
          >
            Next
          </Command>
          <Command
            style={{ gridColumn: "span 2" }}
            className="shade1"
            onTap={() => {
              fetch(`/key`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: connectionId, key: "P" }),
              });
            }}
          >
            Previous
          </Command>
          <Command
            onTap={() => {
              fetch(`/key`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: connectionId, key: "F" }),
              });
            }}
          >
            Fullscreen
          </Command>
          <Command
            onTap={() => {
              fetch(`/key`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: connectionId, key: "1" }),
              });
            }}
          >
            Keep Alive
          </Command>
        </CommandBar>
      </article>
      <footer className="command-bar">
        <Command
          className="shade2"
          onTap={() => {
            enterFullscreen();
          }}
        />
        <div className="command spacer" />
        {connectionId}
      </footer>
    </Panel>
  );
};
