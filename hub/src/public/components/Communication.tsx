import * as React from "react";
import KeyboardButton from "./KeyboardButton";
import { Panel } from "./Panel";

const Communication: React.SFC = () => (
    <Panel>
        <KeyboardButton color="light yellow" keyString="F4" modifierString="win">Toggle Mute</KeyboardButton>
    </Panel>
);

export default Communication;
