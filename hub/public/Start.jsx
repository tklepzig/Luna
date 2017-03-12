import React from "react";
import PresentationControl from "./PresentationControl";
import Touchpad from "./Touchpad";
import fullscreen from "./Fullscreen";

class Start extends React.Component {
    constructor() {
        super();
        this.state = { mode: "start" };
        this.touchpad = this.touchpad.bind(this);
        this.pres = this.pres.bind(this);

        fullscreen.fullscreenChanged(() => {
            if (!fullscreen.isFullscreen()) {
                this.setState({ mode: "start" });
            }
        });
    }

    touchpad() {
        this.setState({ mode: "touchpad" });
        fullscreen.toggle(document.getElementsByTagName("body")[0]);
    }

    pres() {
        this.setState({ mode: "pres" });
        fullscreen.toggle(document.getElementsByTagName("body")[0]);
    }

    render() {
        if (this.state.mode == "start")
            return <div>
                <button onClick={this.pres}>Presentation Control</button>
                <button onClick={this.touchpad}>Touchpad</button>
            </div>;
        else if (this.state.mode == "pres")
            return <PresentationControl />;
        else if (this.state.mode == "touchpad")
            return <Touchpad />;
    }
}

export default Start;
