import React from "react";
import io from "socket.io-client";
class Start extends React.Component {
    constructor() {
        super();
        this.socket = io();
    }

    render() {
        return <p>Nix</p>;
    }
}

export default Start;
