import * as React from "react";

export interface IButtonProps {
    onPress?: (e: any) => void;
    flex?: number;
    secondary?: boolean;
}

export default class Button extends React.Component<IButtonProps, any> {
    private pressEvent: string;

    constructor(props: IButtonProps) {
        super(props);
        this.pressEvent = ("ontouchstart" in window) ? "onTouchEnd" : "onMouseUp";
    }

    public render() {
        const downEventAttribute = { [this.pressEvent]: this.props.onPress };
        let style = {};
        let className = "";

        if (this.props.flex) {
            style = { flex: this.props.flex };
        }

        if (this.props.secondary === true) {
            className += "secondary";
        }

        return (
            <button className={className} style={style} {...downEventAttribute}>
                {this.props.children}
            </button>
        );
    }
}
