import styled, { keyframes } from "styled-components";
import { backgroundImageProperty } from "./constants";
import { greetingAnimation } from "./header";

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;
    width: 500px;
    height: 500px;
    padding: 5px;
    background-image: ${backgroundImageProperty};
`;

export const Textarea = styled.textarea`
    resize: none;
    color: #39ff14;
    font-family: "Cool Font";
    font-size: 20px;
    outline: none;
    background: transparent;
    border: 0px;
    border-bottom: 3px solid green;
`;

export const Button = styled.button`
    margin-bottom: 2em;
    width: 10em;
    outline: none;
    border: 0;
    font-family: "Cool Font";
    font-size: 20px;
    background-image: ${backgroundImageProperty};
    align-self: center;
    background-color: transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    padding: 8px 16px;
    animation: ${greetingAnimation} 0.1s linear infinite;
`;
