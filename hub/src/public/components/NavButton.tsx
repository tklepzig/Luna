import * as React from "react";
import { Button } from "./Button";

export interface INavButtonProps {
    path: string;
    onNavigate: (path: string) => void;
    color?: string;
}

export default class NavButton extends React.Component<INavButtonProps> {
    constructor(props: INavButtonProps) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    public render() {
        return (
            <Button
                color={this.props.color}
                onPress={this.navigate}
            >
                {this.props.children}
            </Button>);
    }

    private navigate() {
        this.props.onNavigate(this.props.path);
    }
}
