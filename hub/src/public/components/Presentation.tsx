import * as React from "react";
import KeyboardButton from "./KeyboardButton";

const Presentation: React.SFC = () => (
    <div>
        <KeyboardButton keyString="P">Previous</KeyboardButton>
        <KeyboardButton keyString="N">Next</KeyboardButton>
    </div>
);

export default Presentation;
