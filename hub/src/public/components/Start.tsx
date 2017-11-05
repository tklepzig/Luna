import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import fullscreen from "../services/Fullscreen";
import NavButton from "./NavButton";
import Touchpad from "./Touchpad";

class Start extends React.Component<RouteComponentProps<any>> {

    constructor() {
        super();
        this.navigate = this.navigate.bind(this);
    }

    public render() {
        return (
            <div>
                <NavButton path="/pres" onNavigate={this.navigate}>Presentation</NavButton>
                <NavButton path="/mouse" onNavigate={this.navigate}>Touchpad</NavButton>
                <NavButton path="/comm" onNavigate={this.navigate}>Communication</NavButton>
            </div>
        );
    }

    private navigate(path: string) {
        this.props.history.push(path);
        fullscreen.request(document.body);
    }
}

export default withRouter(Start);
