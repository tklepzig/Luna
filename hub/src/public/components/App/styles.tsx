import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    min-height: 100%;
  }

  body {
    display: grid;
    height: 100%;
  }

  #root {
    display: grid;
  }
`;
