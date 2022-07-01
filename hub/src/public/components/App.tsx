import { io } from "socket.io-client";
import { BlueHeader } from "./styles";

export const App = () => {
  const socket = io();
  return (
    <div>
      <BlueHeader>App</BlueHeader>
      <button
        onClick={() => {
          socket.emit("keyboard-pressKey", "123456", "F", null);
        }}
      >
        Send
      </button>
    </div>
  );
};
