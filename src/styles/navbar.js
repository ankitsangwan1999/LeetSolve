import styled, { keyframes, css } from "styled-components";

export const greetingAnimation = keyframes`
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
            0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073,
            0 0 70px #e60073;
    }

    to {
        text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
            0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6,
            0 0 80px #ff4da6;
    }`;

export const Div = styled.div`
    text-align: center;
    padding-top: 15px;
    box-sizing: border-box;
    font-family: "Cool Font";
    animation: ${greetingAnimation} 0.5s ease-in-out infinite alternate;
    color: #39ff14;
    font-size: 30px;
    margin: 0 10px 20px 0;

    ${(props) =>
        props && props.type == "logo"
            ? css`
                  font-family: "Tetris Font";
                  margin: 0 0 0 10px;
              `
            : css`
                  flex-basis: 20%;
                  flex-grow: 0;
                  flex-shrink: 0;
              `}
`;

export const Section = styled.div`
    display: flex;
    justify-content: space-between;
`;
