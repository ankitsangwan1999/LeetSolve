import React from "react";
import { Div, Section } from "../styles/navbar";
import {
	Slider,
	SliderText,
	Line,
	SublineIncrease,
	SublineDecrease,
	SublineFull,
} from "../styles/slider";
import propTypes from "prop-types";

const NavBar = ({ message, timer = 0 }) => {
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
						{isLoading === true
							? "Fetching Koshans..."
							: doesCookieExist === false
							? "Go for it, Neo..."
							: isTimeOut === true
							? timer === 0
								? `Trying again...`
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
				(isTimeOut == true ? wasCookieSent === true : true) ? (
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
					{username == ""
						? "Wake up, Neo..."
						: `Welcome, ${username}!`}
				</span>
			</Div>
		</Section>
	);
};

NavBar.propTypes = {
	message: propTypes.shape({
		username: propTypes.string.isRequired,
		isLoading: propTypes.bool.isRequired,
		isTimeOut: propTypes.bool.isRequired,
		doesCookieExist: propTypes.bool.isRequired,
		isCookieValid: propTypes.bool.isRequired,
		wasCookieSent: propTypes.bool.isRequired,
	}),
	timer: propTypes.number,
};

export default NavBar;
