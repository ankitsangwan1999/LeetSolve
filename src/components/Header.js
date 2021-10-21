import React from "react";
import { FaUndo } from "react-icons/fa";
import { Div, Section } from "../styles/header";
import {
	Slider,
	SliderText,
	Line,
	SublineIncrease,
	SublineDecrease,
	SublineFull,
} from "../styles/slider";
import propTypes from "prop-types";

// import 'bootstrap/dist/css/bootstrap.min.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
  crossorigin="anonymous"
/>

const Header = ({ message, timer = 0, isLoggingOut=false }) => {
	const {
		username,
		isCookieValid,
		isTimeOut,
		isLoading,
		doesCookieExist,
		wasCookieSent,
	} = message;

	function refreshPage(){
		// the reload false reloads the current page from the cache 
		// the reload true reloads the page from the server
		window.location.reload(false);
	}

	return (
		<Section>
			<Div type="logo" onClick={refreshPage}>
				<span id="Logo" className="titlelogo">LeetSolve</span>
			</Div>
			<Slider>
				<SliderText>
					<span style={{ color: "#39ff14" }}>
						{isLoggingOut === true
							? "Logging Out ... "
							: isLoading === true
							? "Fetching Questions..."
							: doesCookieExist === false
							? "Go for it, Neo..."
							: isTimeOut === true
							? timer === 0
								? wasCookieSent
									? `Try again, Neo...`
									: `Trying again...`
								: `Request Timed Out. Recovering in ${timer}`
							: isCookieValid === false
							? `Sent Invalid Cookie. Punishment ends in ${timer}  `
							: timer === 0
							? "Dodge This."
							: `Time to Fly... in ${timer}`}
							
						<button style={{color: '#39ff14' , backgroundColor:'unset' , cursor:'pointer' , border:'none' , fontWeight:'bolder' , paddingLeft:'4rem'}}  
						onClick={refreshPage}>
							<span id="Logo" className="titlelogo"><FaUndo/></span>
						</button>
					</span>
				</SliderText>
				<Line />
				{isLoading === false &&
				timer == 0 &&
				(!isLoggingOut && (isTimeOut == true ? wasCookieSent === true : true)) ? (
					<SublineFull />
				) : (
					<>
						<SublineIncrease />
						<SublineDecrease />
					</>
				)}
			</Slider>
			<Div>
				<span id="greeting">
					{isLoggingOut
						? `Till next time, ${username} ...`
						: username == ""
						? "Wake up, Neo..."
						: `Welcome, ${username}!`}
				</span>
			</Div>
		</Section>
	);
};

Header.propTypes = {
	message: propTypes.shape({
		username: propTypes.string.isRequired,
		isLoading: propTypes.bool.isRequired,
		isTimeOut: propTypes.bool.isRequired,
		doesCookieExist: propTypes.bool.isRequired,
		isCookieValid: propTypes.bool.isRequired,
		wasCookieSent: propTypes.bool.isRequired,
	}),
	timer: propTypes.number,
	isLoggingOut: propTypes.bool
};

export default Header;
