import React from "react";
import { LogOutButton } from "../styles/logout-button";
import propTypes from "prop-types";

const LogOut = ({ handleLogOutClick }) => {
	const handleLogout = () => {
		//Called when LogOut button is clicked
		handleLogOutClick();
	};

	return (
		<div>
			<LogOutButton onClick={handleLogout} isLogOutButton={true}>
				LogOut
			</LogOutButton>
		</div>
	);
};

LogOut.propTypes = {
	handleLogOutClick: propTypes.func,
};

export default LogOut;
