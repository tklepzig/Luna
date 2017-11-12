import * as React from "react";
import KeyboardButton from "./KeyboardButton";
import { Panel } from "./Panel";

const Presentation: React.SFC = () => (
    <Panel>
        <KeyboardButton color="dim orange" flex={1} keyString="P">Previous</KeyboardButton>
        <KeyboardButton color="orange" flex={5} keyString="N">Next</KeyboardButton>
    </Panel>
);

export default Presentation;
