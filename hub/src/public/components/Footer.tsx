import * as React from "react";

export interface IFooterProps {
}

export const Footer: React.SFC<IFooterProps> = (props) => <div className="footer">{props.children}</div>;
