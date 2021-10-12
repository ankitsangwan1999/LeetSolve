import { ipcRenderer } from "electron";
import { USER_DATA_EVENT } from "../Constants";
import getTimerValueBasedOnResponse from "./GetTimerValueBasedOnResponse";

const emitUserDataEvent = (setResponse) => {
	ipcRenderer.send(USER_DATA_EVENT);
	ipcRenderer.on(USER_DATA_EVENT, (e, res) => {
		console.log("Client Receiver in APP:", res);

		setResponse((prev) => {
			const timerValue = getTimerValueBasedOnResponse(res.message);
			return {
				...res,
				message: { ...res.message, isLoading: false },
				timer: timerValue,
				shouldRunTimer: timerValue !== 0,
			};
		});

		// Removing all listeners to this event after getting the response.
		ipcRenderer.removeAllListeners();
	});
};

export default emitUserDataEvent;
