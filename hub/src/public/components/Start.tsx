import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import fullscreen from "../services/Fullscreen";
import luna from "../services/Luna";
import { Footer } from "./Footer";
import NavButton from "./NavButton";
import { Panel } from "./Panel";

class Start extends React.Component<RouteComponentProps<any>> {

    constructor() {
        super();
        this.navigate = this.navigate.bind(this);
    }

    public render() {
        return (
            <Panel>
                <NavButton flex={1} path="/pres" onNavigate={this.navigate}>Presentation</NavButton>
                <NavButton flex={1} path="/mouse" onNavigate={this.navigate}>Touchpad</NavButton>
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
