import React from "react";
import { Div } from "../styles/gif-component.js";
import propTypes from "prop-types";

const GifComponent = ({ src, video = false, onVideoEnd }) => {

	const handleVideoEnded = () => {
		onVideoEnd && onVideoEnd();
	}

	return (
		<Div>
			{video === true ? (
				<video autoPlay onEnded={handleVideoEnded}>
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
	onVideoEnd: propTypes.func
};
