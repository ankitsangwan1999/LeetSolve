export default (value) => {
	const currMilliSeconds = new Date().getTime();
	const endSeconds = (currMilliSeconds + 84600) / 1000;
	return {
		url: "https://leetsolve.matrix.com",
		name: "MY_TASTY_COOKIE",
		value: value,
		expirationDate: endSeconds,
		httpOnly: true,
		secure: true,
		strict: true,
		sameSite: "strict",
		session: false,
	};
};
