import * as React from "react";
import styled from "styled-components";
import KeyboardButton from "./KeyboardButton";

const Container = styled.section`
    display: grid;
    grid-template: 1fr 3fr / 1fr;
    grid-gap: 1rem 0;
    padding: 1rem;
`;

export const Presentation: React.SFC = () => (
    <Container>
        <KeyboardButton color="dim orange" keyString="P">Previous</KeyboardButton>
        <KeyboardButton color="orange" keyString="N">Next</KeyboardButton>
    </Container>
);
