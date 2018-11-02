import { createGlobalStyle } from "styled-components";
import { background, foreground } from "./variables";

export const GlobalStyle = createGlobalStyle`
    body,
    html {
        background: ${background};
        height: 100%;
        min-height: 100%;
        margin: 0;
    }

    body {
        color: ${foreground};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        touch-action: none;
        -webkit-tap-highlight-color: transparent;
        &:fullscreen {
            width: 100%;
        }
        &:-webkit-full-screen {
            width: 100%;
        }
        &:-moz-full-screen {
            width: 100%;
        }
    }

    #root {
        height: 100%;
        display: grid;
        grid-template: 1fr / 1fr;
    }
`;
