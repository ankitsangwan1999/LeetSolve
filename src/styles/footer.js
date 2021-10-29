import styled, { keyframes, css } from "styled-components";
import { backgroundImageProperty } from "./constants";
export const rotate = keyframes`
0%{opacity: 0.75}
 30% {  opacity: 1 }
 60% {  opacity: 0.75; }
 100% { opacity: 0.5; 
}`;
export const Rotate = styled.div`
display : inline-flex;
animation: ${rotate} 0.5s linear infinite;
`;
export const Div = styled.div`
    color: #39ff14;
    padding: 10px;
    background-image:  ${backgroundImageProperty};
    margin-top: auto;
`;
