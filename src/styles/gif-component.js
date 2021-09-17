import styled from "styled-components";
import { backgroundImageProperty } from "./constants";

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    padding: 5px;
    width: 500px;
    height: 450px;
    background-image: ${backgroundImageProperty};
`;
