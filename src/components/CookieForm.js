import React, { useState, useRef } from "react";
import { ipcRenderer } from "electron";
import { Div,Div1, Textarea, Button } from "../styles/cookie-form.js";
import propTypes from "prop-types";
import { HANDLE_FORM_EVENT, USER_DATA_EVENT } from "../Constants.js";
function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
}
const CookieForm = ({ setResponse }) => {
	const input = useRef(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const buttonClickHanlder = () => {
		if (input.current.value === "") {
			alert("Empty Field Not Allowed");
		} else {
			removeFadeOut(document.getElementById('fade'), 2000);
			
			ipcRenderer.send(HANDLE_FORM_EVENT, input.current.value);
			ipcRenderer.on(USER_DATA_EVENT, (e, res) => {
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
			setTimeout(() => {
				setIsFormSubmitted(true);
			}, 2000);
			
		}
	};

	return (
		<Div>
			{!isFormSubmitted && (
				<Div1 id="fade">
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
				</Div1>
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
