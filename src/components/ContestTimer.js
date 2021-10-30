import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { AddRemoveButton } from "../styles/add-remove-button";

const ContestTimer = ({ setContestEnded, startTime }) => {

	const remainingTimeInSeconds = () => {
		const curtime = Date.now();
        let difference = startTime + (1.5*60*60*1000) - curtime;       //Contest of 1hr 30min
		return Math.floor(difference/1000);
	}

    const calculateTimeLeft = () => {
        const curtime = Date.now();
        let difference = startTime + (1.5*60*60*1000) - curtime;       //Contest of 1hr 30min
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
                mins: Math.floor((difference / (1000 * 60)) % 60),
                secs: Math.floor((difference / 1000) % 60)
            };
        } else {
			setContestEnded(true);
		}
        return timeLeft;
    }

	const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer=setTimeout(() => {
		  setTimeLeft(calculateTimeLeft());
		}, 1000);

		// Clear timeout if the component is unmounted
		return () => clearTimeout(timer);
	});

	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}

		timerComponents.push(
			<span style={{fontSize: "20px"}} >
				{timeLeft[interval]} {interval}{" "}
			</span>
		);
	});

	const remTime = remainingTimeInSeconds();

	return (
		<div style={{marginLeft: "44%", marginBottom: "20px" }} >
			<AddRemoveButton isAddButton={remTime > 120} isRemoveButton={remTime <= 120} >
				{timerComponents.length ? timerComponents : <span>Time's up!</span>}
			</AddRemoveButton>
		</div>
	);
};

ContestTimer.propTypes = {
	setContestEnded: propTypes.func,
	startTime: propTypes.number,
};

export default ContestTimer;
