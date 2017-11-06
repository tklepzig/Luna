import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import fullscreen from "../services/Fullscreen";
import luna from "../services/Luna";
import Button from "./Button";
import NavButton from "./NavButton";
import Touchpad from "./Touchpad";

class Start extends React.Component<RouteComponentProps<any>> {

    constructor() {
        super();
        this.navigate = this.navigate.bind(this);
    }

    public render() {
        return (
            <div className="group-v">
                <NavButton flex={1} path="/pres" onNavigate={this.navigate}>Presentation</NavButton>
                <NavButton flex={1} path="/mouse" onNavigate={this.navigate}>Touchpad</NavButton>
                <NavButton flex={1} path="/comm" onNavigate={this.navigate}>Communication</NavButton>
                <div style={{ flex: 3 }} />
                <Button secondary>Connection ID: {luna.ConnectionId}</Button>
            </div>
        );
    }

    private navigate(path: string) {
        this.props.history.push(path);
        fullscreen.request(document.body);
    }
}

export default withRouter(Start);
