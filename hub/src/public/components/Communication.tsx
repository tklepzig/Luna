import * as React from "react";
import KeyboardButton from "./KeyboardButton";

const Communication: React.SFC = () => (
    <div>
        <KeyboardButton keyString="F4" modifierString="win">Toggle Mute</KeyboardButton>
    </div>
);

export default Communication;
