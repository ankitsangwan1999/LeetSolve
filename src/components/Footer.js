import React from "react";
import { Div,Rotate } from "../styles/footer";
import propTypes from "prop-types";
const Footer = ({timer=0,message}) => {
	return (
		<Div>
			 Made with<Rotate> ❤️ </Rotate> &ensp; for ContriHub&apos;21. {message} {timer}
		</Div>	
	);
	};	
export default Footer;
Footer.propTypes = {
	timer: propTypes.number
};
