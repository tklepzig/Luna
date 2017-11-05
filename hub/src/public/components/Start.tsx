import * as React from "react";
import KeyboardButton from "./KeyboardButton";
import Touchpad from "./Touchpad";

export default class Start extends React.Component {
    public render() {
        return (
            <div>
                <KeyboardButton keyString="P">Previous</KeyboardButton>
                <KeyboardButton keyString="N">Next</KeyboardButton>
                <KeyboardButton keyString="F4" modifierString="win">Toggle Mute</KeyboardButton>
                <Touchpad />
            </div>
        );
    }
}
