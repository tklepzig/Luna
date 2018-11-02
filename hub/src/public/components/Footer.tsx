import * as React from "react";
import styled from "styled-components";
import { boxShadow, gold } from "../styles/variables";

const StyledFooter = styled.section`
    font-family: inherit;
    font-size: 0.9rem;
    outline: none;
    box-sizing: content-box;
    cursor: default;
    background: transparent;
    border: none;
    margin: 0 -1rem -1rem;
    box-shadow: ${boxShadow};
    padding: 16px 12px;
    padding-top: 12px;
    color: ${gold};
    text-align: center;
`;

export const Footer: React.SFC = (props) =>
    <StyledFooter>{props.children}</StyledFooter>;
