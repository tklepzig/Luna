import * as React from "react";
import luna, { MouseButton, MouseWheelDirection } from "../services/Luna";
import Button from "./Button";

export interface IKeyboardButtonProps {
    keyString: string;
    modifierString?: string;
    color?: string;
    flex?: number;
}

export default class KeyboardButton extends React.Component<IKeyboardButtonProps, any> {
    private pressEvent: string;

    constructor(props: IKeyboardButtonProps) {
        super(props);
        this.press = this.press.bind(this);
    }

    public render() {
        return (
            <Button flex={this.props.flex} color={this.props.color} onPress={this.press}>{this.props.children}</Button>
        );
    }

    private press(e: any) {
        luna.sendKeyPress(this.props.keyString, this.props.modifierString);
    }
}
