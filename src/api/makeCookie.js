export default (value) => {
	const currMilliSeconds = new Date().getTime(); // Give milliseconds since EPOCH
	const endSeconds = currMilliSeconds / 1000 + 84600; // Cookie will expire in 24 hours
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
