import styled, { css } from "styled-components";

export const ShuffleButton = styled.a`
	border-bottom: 1px dashed;
	text-decoration: none;
	hover {
		cursor: help;
		position: relative;
	}
	span {
		display: none;
	}
	hover span {
		border: #666 2px dotted;
		padding: 5px 20px 5px 5px;
		display: block;
		z-index: 100;
		background: #e3e3e3;
		left: 0px;
		margin: 15px;
		width: 300px;
		position: absolute;
		top: 15px;
		text-decoration: none;
	}
	${(props) =>
		props &&
		props.maxHeight &&
		css`
			max-height: ${props.maxHeight};
		`}
`;
