import styled, { css } from "styled-components";

export const Scrollable = styled.div`
	overflow: auto;
	${(props) =>
		props &&
		props.maxHeight &&
		css`
			max-height: ${props.maxHeight};
		`}
`;
