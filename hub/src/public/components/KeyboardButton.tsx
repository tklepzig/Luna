import * as React from "react";
import Luna from "../services/Luna";
import Vibration from "../services/Vibration";
import { Button } from "./Button";

export interface IKeyboardButtonProps {
    keyString: string;
    modifierString?: string;
    color?: string;
}

export default class KeyboardButton extends React.Component<IKeyboardButtonProps, any> {
    constructor(props: IKeyboardButtonProps) {
        super(props);
        this.press = this.press.bind(this);
    }

    public render() {
        return (
            <Button color={this.props.color} onPress={this.press}>{this.props.children}</Button>
        );
    }

    private press() {
        Vibration.vibrate();
        Luna.sendKeyPress(this.props.keyString, this.props.modifierString);
    }
}
