import styled, { keyframes, css } from "styled-components";
import { backgroundImageProperty } from "./constants";
export const rotate = keyframes`
from {
  font-size: 0.6rem;
}

to {
  font-size:0.8rem;
  
}`;
export const Rotate = styled.div`
display : inline-flex;
z-index : 1;
animation: ${rotate} 0.5s linear infinite;
bottom :0;
position:absolute;
padding: 12px;

`;
export const Div = styled.div`

    color: #39ff14;
    padding: 10px;
    background-image:  ${backgroundImageProperty};
    margin-top: auto;
`;
