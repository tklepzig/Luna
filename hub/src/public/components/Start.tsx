import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import fullscreen from "../services/Fullscreen";
import luna from "../services/Luna";
import Button from "./Button";
import { Footer } from "./Footer";
import NavButton from "./NavButton";
import { Orientation, Panel } from "./Panel";
import Touchpad from "./Touchpad";

class Start extends React.Component<RouteComponentProps<any>> {

    constructor() {
        super();
        this.navigate = this.navigate.bind(this);
    }

    public render() {
        return (
            <Panel>
                <NavButton flex={1} path="/pres" onNavigate={this.navigate}>Presentation</NavButton>
                <NavButton color="light green" flex={1} path="/mouse" onNavigate={this.navigate}>Touchpad</NavButton>
                <NavButton color="dim orange" flex={1} path="/comm" onNavigate={this.navigate}>Communication</NavButton>
                <div style={{ flex: 3 }} />
                <Footer>Connection ID: {luna.ConnectionId}</Footer>
            </Panel>
        );
    }

    private navigate(path: string) {
        this.props.history.push(path);
        fullscreen.request(document.body);
    }
}

export default withRouter(Start);
