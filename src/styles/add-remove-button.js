import styled, { css } from "styled-components";

//Styled component for LogOut button

export const AddRemoveButton = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #ff00e0;
    color: white;
    font-family: "Cool Font";
    padding: 0.25em 1em;
    margin: 0 10px 0 10px;
    ${(props) =>
        props &&
        (
            (props.isRemoveButton &&
            css`
                color: #ff0000;
            `)
            ||
            (props.isAddButton &&
            css`
                color: #39ff14;
            `)
        )
    }
`;
