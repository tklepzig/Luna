import * as React from "react";

export enum Orientation {
    Vertical,
    Horrizontal
}

export interface IPanelProps {
    orientation?: Orientation;
}

export const Panel: React.SFC<IPanelProps> = (props) => {
    let className = "panel-";
    className += props.orientation === Orientation.Vertical ? "v" : "h";
    return (<div className={className}>{props.children}</div>);
};

Panel.defaultProps = {
    orientation: Orientation.Vertical
};
