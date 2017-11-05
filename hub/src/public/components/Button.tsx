import * as React from "react";

export interface IButtonProps {
    onPress?: (e: any) => void;
}

export default class Button extends React.Component<IButtonProps, any> {
    private pressEvent: string;

    constructor(props: IButtonProps) {
        super(props);
        this.pressEvent = ("ontouchstart" in window) ? "onTouchEnd" : "onMouseUp";
    }

    public render() {
        const downEventAttribute = { [this.pressEvent]: this.props.onPress };
        return (
            <button {...downEventAttribute}>{this.props.children}</button>
        );
    }
}
