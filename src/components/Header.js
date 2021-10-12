import React from "react";
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

const Header = ({ message, timer = 0, isLoggingOut=false }) => {
	const {
		username,
		isCookieValid,
		isTimeOut,
		isLoading,
		doesCookieExist,
		wasCookieSent,
	} = message;

	return (
		<Section>
			<Div type="logo">
				<span id="Logo">LeetSolve</span>
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
							? `Sent Invalid Cookie. Punishment ends in ${timer}`
							: timer === 0
							? "Dodge This."
							: `Time to Fly... in ${timer}`}
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
