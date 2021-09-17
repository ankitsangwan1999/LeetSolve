import React from "react";
import { Div } from "../styles/gif-component.js";
import propTypes from "prop-types";

const GifComponent = ({ src, video = false }) => {
	return (
		<Div>
			{video === true ? (
				<video autoPlay>
					<source src={src} type="video/mp4"></source>
				</video>
			) : (
				<img src={src} />
			)}
		</Div>
	);
};

export default GifComponent;

GifComponent.propTypes = {
	src: propTypes.string.isRequired,
	video: propTypes.bool,
};
