import styled from "styled-components";

export const Panel = styled.div.attrs({ className: "panel" })`
  > article {
    display: grid;
  }
  > footer {
    grid: 1fr / auto 1fr auto;
  }
`;

export const CommandBar = styled.div.attrs({
  className: "compound-commands vertical",
})``;
