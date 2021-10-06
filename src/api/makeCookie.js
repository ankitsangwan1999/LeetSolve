export default (value) => {
	const currMilliSeconds = new Date().getTime();
        // Cookies expires in 1 day
	const endSeconds = currMilliSeconds / 1000 + 84600;
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
