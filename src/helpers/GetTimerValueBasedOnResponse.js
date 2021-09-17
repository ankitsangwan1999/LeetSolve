export const getTimerValueBasedOnResponse = ({
	wasCookieSent,
	isTimeOut,
	doesCookieExist,
}) => {
	const timerValue = 6;
	if (isTimeOut) {
		return timerValue;
	} else {
		if (doesCookieExist) {
			if (wasCookieSent) {
				return timerValue;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	}
};

export default getTimerValueBasedOnResponse;
