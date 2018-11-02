import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import fullscreen from "../services/Fullscreen";
import luna from "../services/Luna";
import { Footer } from "./Footer";
import NavButton from "./NavButton";

const Container = styled.section`
    display: grid;
    grid-template: auto auto 1fr auto / 1fr;
    grid-gap: 1rem 0;
    padding: 1rem;
`;

class Start extends React.Component<RouteComponentProps> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    public render() {
        return (
            <Container>
                <NavButton path="/pres" onNavigate={this.navigate}>Presentation</NavButton>
                <NavButton path="/mouse" onNavigate={this.navigate}>Touchpad</NavButton>
                <div />
                <Footer>Connection ID: {luna.ConnectionId}</Footer>
            </Container>
        );
    }

    private navigate(path: string) {
        this.props.history.push(path);
        fullscreen.request(document.body);
    }
}

export default withRouter(Start);
