import * as React from "react";
import KeyboardButton from "./KeyboardButton";
import { Panel } from "./Panel";

const Presentation: React.SFC = () => (
    <Panel>
        <KeyboardButton keyString="P">Previous</KeyboardButton>
        <KeyboardButton keyString="N">Next</KeyboardButton>
    </Panel>
);

export default Presentation;
