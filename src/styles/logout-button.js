import styled, { css } from "styled-components";

//Styled component for LogOut button

export const LogOutButton = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #ff00e0;
    color: white;
    font-family: "Cool Font";
    padding: 0.25em 1em;
    margin: 0 10px 0 10px;
    position: absolute;
    right: 20px;
    ${(props) =>
        props &&
        props.isLogOutButton &&
        css`
            color: #ff0000;
        `}
`;
