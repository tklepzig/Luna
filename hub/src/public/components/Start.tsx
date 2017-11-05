import * as React from "react";
import KeyboardButton from "./KeyboardButton";
import Touchpad from "./Touchpad";

export default class Start extends React.Component {
    public render() {
        return (
            <div>
                <KeyboardButton key="P">Previous</KeyboardButton>
                <KeyboardButton key="N">Next</KeyboardButton>
                <KeyboardButton key="F4" modifier="win">Toggle Mute</KeyboardButton>
                <Touchpad />
            </div>
        );
    }
}
