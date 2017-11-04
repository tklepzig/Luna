import * as React from "react";

export interface IButtonProps {

}

export default class Button extends React.Component<IButtonProps, any> {
    private pressEvent: string;

    constructor(props: IButtonProps) {
        super(props);
        this.press = this.press.bind(this);
        this.pressEvent = ("ontouchstart" in window) ? "onTouchEnd" : "onMouseUp";
    }

    public render() {
        const downEventAttribute = { [this.pressEvent]: this.press };
        return (
            <button {...downEventAttribute}>
                Test
      </button>
        );
    }

    private press() {
    }
}
