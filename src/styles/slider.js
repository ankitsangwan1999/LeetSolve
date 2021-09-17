import styled, { keyframes } from "styled-components";

const decreaseAnimation = keyframes`
	from { left: -80%; width: 80%; }
	to { left: 110%; width: 10%;}
`;

const increaseAnimation = keyframes`
	from { left: -5%; width: 5%; }
 	to { left: 130%; width: 100%;}
`;

export const Slider = styled.div`
    width: 40%;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const SliderText = styled.div`
    text-align: center;
`;

export const Line = styled.div`
    background: #00000;
    width: 100%;
`;

export const SublineIncrease = styled.div`
    position: absolute;
    background: #39ff14;
    height: 2px;
    animation: ${increaseAnimation} 2s infinite;
`;

export const SublineDecrease = styled.div`
    position: absolute;
    background: #39ff14;
    height: 2px;
    animation: ${decreaseAnimation} 2s 0.5s infinite;
`;

export const SublineFull = styled.div`
    position: absolute;
    background: #39ff14;
    height: 2px;
    width: 100%;
`;
