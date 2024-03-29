import React from "react";
import emitUserDataEvent from "../helpers/EmitUserDataEvent";
import propTypes from "prop-types";
import GifComponent from "./GifComponent";
import PreLoader from "./PreLoader";
import CookieForm from "./CookieForm";
import CategoryNavBar from "./CategoryNavBar";
import QuestionsTable from "./QuestionsTable";

const AppContent = ({ response, setResponse }) => {
	if (response.timer !== 0) {
		// Timer is Still Running
		if (response.message.isTimeOut) {
			return (
				<>
					<PreLoader />
					<GifComponent src="src/static/gifs/timeOut.gif" />;
				</>
			);
		} else {
			if (response.message.isCookieValid) {
				return (
					<>
						<PreLoader />
						<GifComponent
							src="src/static/gifs/atLast.mp4"
							video={true}
						/>
						;
					</>
				);
			} else {
				return (
					<>
						<PreLoader />
						<GifComponent src="src/static/gifs/badInput.gif" />;
					</>
				);
			}
		}
	} else {
		// Timer finished/Did not start
		if (response.message.isTimeOut) {
			if (response.message.doesCookieExist) {
				if (response.message.wasCookieSent) {
					return (
						<>
							<PreLoader />
							<CookieForm setResponse={setResponse} />
						</>
					);
				} else {
					return (
						<>
							<PreLoader />
							{emitUserDataEvent(setResponse)}
							<GifComponent src="src/static/gifs/wait.gif" />;
						</>
					);
				}
			} else {
				return (
					<>
						<PreLoader />
						<CookieForm setResponse={setResponse} />
					</>
				);
			}
		} else {
			if (response.message.doesCookieExist) {
				if (response.message.isCookieValid) {
					return (
						<>
							<CategoryNavBar categories={["Attempted"]} />
							<QuestionsTable data={response.data} />
						</>
					);
				} else {
					return (
						<>
							<PreLoader />
							<CookieForm setResponse={setResponse} />
						</>
					);
				}
			} else {
				return (
					<>
						<PreLoader />
						<CookieForm setResponse={setResponse} />
					</>
				);
			}
		}
	}
};

export default AppContent;

AppContent.propTypes = {
	response: propTypes.shape({
		message: propTypes.shape({
			username: propTypes.string.isRequired,
			isTimeOut: propTypes.bool.isRequired,
			isCookieValid: propTypes.bool.isRequired,
			doesCookieExist: propTypes.bool.isRequired,
			wasCookieSent: propTypes.bool.isRequired,
			isLoading: propTypes.bool.isRequired,
		}),
		timer: propTypes.number,
		data: propTypes.object,
	}),
	setResponse: propTypes.func,
};
