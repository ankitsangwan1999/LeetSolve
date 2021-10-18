import styled, { css } from "styled-components";
export const shufflestyle = {
	borderBottom: "1px dashed",

	":hover": {
		cursor: "help",
		position: "relative",
		color: "yellow",
	},
	span: {
		display: "none",
	},
	":hover span": {
		border: "#666 2px dotted",
		padding: "5px 20px 5px 5px",
		display: "block",
		"z-index": "100",
		background: "#e3e3e3",
		left: "0px",
		margin: "15px",
		width: "300px",
		position: " absolute",
		top: "15px",
		"text-decoration": "none",
	},
};
export const ShuffleButton = styled.a`
	href: "#";
	border-bottom: 1px dashed;
	text-decoration: none;
	&:hover {
		position: relative;
	}
	span {
		display: none;
		position: relative;
	}
	&:hover span {
		border: #39ff14 2px dashed;
		display: block;
		z-index: 2;
		background: black;
		left: -300px;
		font-size: 12px;
		margin: 15px;
		width: 200px;
		position: absolute;
		top: 0px;
		text-decoration: none;
	}
`;
