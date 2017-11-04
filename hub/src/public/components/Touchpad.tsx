import * as React from "react";

export interface ITouchpadProps {
}

export default class Touchpad extends React.Component<ITouchpadProps, any> {
    constructor(props: ITouchpadProps) {
        super(props);
    }
    public render() {
        return (
            <div className="touchpad" />
        );
    }
}
