import * as React from "react";

export interface ButtonProps {
    onPress?: (e: any) => void;
    flex?: number;
    color?: string;
}

export default class Button extends React.Component<ButtonProps, any> {
    public static defaultProps: Partial<ButtonProps> = {
        color: "blue"
    };

    private pressEvent: string;

    constructor(props: ButtonProps) {
        super(props);
        this.pressEvent = ("ontouchstart" in window) ? "onTouchEnd" : "onMouseUp";
    }

    public render() {
        const downEventAttribute = { [this.pressEvent]: this.props.onPress };
        let style = {};
        const className = `${this.props.color}`;

        if (this.props.flex) {
            style = { flex: this.props.flex };
        }

        return (
            <button className={className} style={style} {...downEventAttribute}>
                {this.props.children}
            </button>
        );
    }
}
