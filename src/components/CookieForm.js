import React, { useState, useRef } from "react";
import { ipcRenderer } from "electron";
import { Div, Textarea, Button } from "../styles/cookie-form.js";
import propTypes from "prop-types";

const CookieForm = ({ setResponse }) => {
	const input = useRef(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const buttonClickHanlder = () => {
		if (input.current.value === "") {
			alert("Empty Field Not Allowed");
		} else {
			setIsFormSubmitted(true);
			ipcRenderer.send("handle-form", input.current.value);
			ipcRenderer.on("user-data", (e, res) => {
				console.log("Client-Form:", res);
				setResponse((prev) => {
					return {
						...res,
						message: { ...res.message, isLoading: false },
						timer: 6,
						shouldRunTimer: true,
					};
				});
				ipcRenderer.removeAllListeners();
			});
		}
	};

	return (
		<Div>
			{!isFormSubmitted && (
				<>
					<img src="src/static/gifs/cookie.gif" />
					<Textarea
						rows="2"
						type="text"
						placeholder="LEETCODE_SESSION Cookie"
						autoFocus={true}
						required={true}
						ref={input}
					/>
					<Button
						onClick={() => {
							buttonClickHanlder();
						}}
					>
						Enter Now
					</Button>
				</>
			)}

			{isFormSubmitted && (
				<>
					<img src="src/static/gifs/pleasing.gif" />
				</>
			)}
		</Div>
	);
};

export default CookieForm;

CookieForm.propTypes = {
	// response: propTypes.shape({
	//     message: propTypes.shape({
	//         username: propTypes.string.isRequired,
	//         isCookieValid: propTypes.bool.isRequired,
	//         isTimeOut: propTypes.bool.isRequired,
	//         isLoading: propTypes.bool.isRequired,
	//         doesCookieExist: propTypes.bool.isRequired,
	//     }),
	//     timer: propTypes.number,
	//     data: propTypes.object,
	// }),
	setResponse: propTypes.func,
	// startTimer: propTypes.func,
};
