import * as React from "react";

export enum ButtonColor {
    Blue,
    DarkBlue,
    Orange,
    Yellow,
    Green
}

export interface IButtonProps {
    onPress?: (e: any) => void;
    flex?: number;
    color?: ButtonColor;
}

export default class Button extends React.Component<IButtonProps, any> {
    public static defaultProps: Partial<IButtonProps> = {
        color: ButtonColor.Blue
    };

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

        switch (this.props.color) {
            case ButtonColor.Blue:
                className += " blue";
                break;
            case ButtonColor.DarkBlue:
                className += " dark-blue";
                break;
            case ButtonColor.Orange:
                className += " orange";
                break;
            case ButtonColor.Yellow:
                className += " yellow";
                break;
            case ButtonColor.Green:
                className += " green";
                break;
        }

        return (
            <button className={className} style={style} {...downEventAttribute}>
                {this.props.children}
            </button>
        );
    }
}
