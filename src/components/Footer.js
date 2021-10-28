import React from "react";
import { Div,Rotate } from "../styles/footer";
import propTypes from "prop-types";
const Footer = () => {
	return (
		<Div>
			 Made with <Rotate> ❤️ </Rotate> for ContriHub&apos;21. 
		</Div>	
	);
	};	
export default Footer;
Footer.propTypes = {
	timer: propTypes.number
};
