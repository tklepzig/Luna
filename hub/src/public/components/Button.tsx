import * as React from "react";
import styled from "styled-components";
import {
    background, blue, blueActive, boxShadow,
    foreground, gold, goldActive, primary, primaryActive, primaryFg
} from "../styles/variables";

const StyledButton = styled.button`
    font-family: inherit;
    font-size: 0.9rem;
    padding: 20px 12px;
    min-width: 80px;
    outline: none;
    border: none;
    box-sizing: content-box;
    cursor: pointer;
    transition: background 0.15s ease-out;
    user-select: none;
    &[disabled] {
        cursor: default;
        opacity: 0.5;
    }
    background: ${primary};
    color: ${primaryFg};
    box-shadow: ${boxShadow};
    &.gold {
        background: ${gold};
        color: ${background};
        &:active {
            background: ${goldActive};
        }
    }
    &.blue {
        background: ${blue};
        color: ${foreground};
        &:active {
            background: ${blueActive};
        }
    }
    &:active {
        background: ${primaryActive};
    }
`;

export interface ButtonProps {
    onPress?: (e: any) => void;
    color?: string;
}

export class Button extends React.Component<ButtonProps, any> {
    public static defaultProps: Partial<ButtonProps> = {
        color: ""
    };

    private pressEvent: string;

    constructor(props: ButtonProps) {
        super(props);
        this.pressEvent = ("ontouchstart" in window) ? "onTouchEnd" : "onMouseUp";
    }

    public render() {
        const downEventAttribute = { [this.pressEvent]: this.props.onPress };
        const className = `${this.props.color}`;

        return (
            <StyledButton className={className} {...downEventAttribute}>
                {this.props.children}
            </StyledButton>
        );
    }
}
