import axios from "axios";
import { API_URL, TIME_OUT_LIMIT } from "../Constants";

const checkCookieValidity = async (cookieHeaderString) => {
	let response = {
		message: {
			username: "",
			isTimeOut: false,
			doesCookieExist: true,
			isCookieValid: false,
			wasCookieSent: false,
		},
		data: {},
	};

	try {
		const res = await axios.get(API_URL, {
			timeout: 1000 * TIME_OUT_LIMIT,
			headers: { cookie: cookieHeaderString },
		});

		console.log("Response Returned by Leetcode.");
		response = { ...response, data: { ...res.data } };
		response.message.username = res.data.user_name;

		if (response.message.username === "") {
			console.log("This Cookie is either invalid or expired.");
			response.message.isCookieValid = false;
			response.message.isTimeOut = false;
			return Promise.reject(response);
		} else {
			console.log("Hi", response.message.username);
			response.message.isCookieValid = true;
			response.message.isTimeOut = false;
			return Promise.resolve(response);
		}
	} catch (err) {
		console.log("May be Request took long time to reply...");
		response.message.isTimeOut = true;
		return Promise.reject(response);
	}
};

export default checkCookieValidity;
