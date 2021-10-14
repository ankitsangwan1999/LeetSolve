import "regenerator-runtime/runtime"; // To be able to use async-await syntax
const {
	app,
	BrowserWindow,
	ipcMain,
	shell,
	session,
	screen,
} = require("electron");
const path = require("path");
const url = require("url");
const axios = require("axios");
import checkCookieValidity from "./src/api/CheckCookieValidity";
import makeCookie from "./src/api/makeCookie";
import {
	API_URL,
	LOGOUT_EVENT,
	USER_DATA_EVENT,
	HANDLE_FORM_EVENT,
	TIME_OUT_LIMIT,
} from "./src/Constants";

// for DEV purpose only
import smallResponse from "./src/DummyData/smallResponse";

// init mainWindow of the Application
let mainWindow, cookieJar;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		minWidth: 600,
		minHeight: 600,
		icon: __dirname + "/src/static/images/icon.png",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},

		autoHideMenuBar: true,
	});
	cookieJar = session.defaultSession.cookies;

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "/index.html"),
			protocol: "file:",
			slashes: true,
		})
	);

	// TODO: Add Ctrl+W, shortcut for Windows if not Available.
	mainWindow.on("close", () => {
		mainWindow = null;
	});

	// To make clicked links open with default browser
	mainWindow.webContents.on("new-window", (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
};

// Catch handle-form event
ipcMain.on(HANDLE_FORM_EVENT, async (e, cookie) => {
	cookie = cookie.trim();
	console.log("Server: Received handle-form event with cookie:", cookie);
	const cookieHeaderString = `LEETCODE_SESSION=${cookie};`;

	try {
		const response = await checkCookieValidity(cookieHeaderString);
		console.log(
			"IDHAR:",
			response.message.wasCookieSent,
			typeof response.message.wasCookieSent
		);
		response.message.wasCookieSent = true;
		// Store this Cookie
		cookieJar
			.set(makeCookie(cookie))
			.then(() => {
				console.log("Cookies Set.");
				cookieJar
					.get({
						url: "https://leetsolve.matrix.com",
						name: "MY_TASTY_COOKIE",
					})
					.then((cookies) => {
						console.log("Showing All Cookies now:");
						cookies.map((cookie) => {
							console.log(
								"here is it:",
								cookie,
								cookie.expirationDate
							);
						});
						console.log(cookies.length);
					})
					.catch((err) => {
						console.log("ERROR: While Getting All Cookie Values");
					});
				mainWindow.webContents.send(USER_DATA_EVENT, response);
			})
			.catch((err) => {
				console.log("ERROR: While Setting Cookie.", err);
			});
	} catch (response) {
		response.message.wasCookieSent = true;

		// Do not Store this Cookie
		console.log(
			"This Cookie is either invalid or expired./Req Timed Out",
			response
		);
		mainWindow.webContents.send(USER_DATA_EVENT, response);
	}
});

// Catch user-data event emitted by Client
ipcMain.on(USER_DATA_EVENT, async (e) => {
	// TESTING BEGINS
	// cookieJar
	//     .set(makeCookie(<ENTER_YOUR_COOKIE_HERE>))
	//     .then(() => {
	//         console.log("Cookies Set.");
	//     })
	//     .catch((err) => {
	//         console.log("Can't Set");
	//     });

	// TESTING ENDS

	cookieJar
		.get({ url: "https://leetsolve.matrix.com", name: "MY_TASTY_COOKIE" })
		.then(async (cookies) => {
			if (cookies.length !== 0) {
				const cookieObj = cookies[0];
				console.log("Yea... Your Cookie is Here.");
				const cookieHeaderString = `LEETCODE_SESSION=${cookieObj.value};`;
				try {
					const response = await checkCookieValidity(
						cookieHeaderString
					);
					mainWindow.webContents.send(USER_DATA_EVENT, response);
				} catch (response) {
					if (response.message.isTimeOut) {
						console.log(
							"We ran out of time while fetching data for your EXISTING cookie",
							response
						);
					} else {
						console.log(
							"That Sounds Weird but I will allow it.",
							response
						);
					}

					mainWindow.webContents.send(USER_DATA_EVENT, response);
				}
			} else {
				console.log("ERROR: Can't Find Your Cookie");
				let response = {
					message: {
						username: "",
						isTimeOut: false,
						doesCookieExist: false,
						isCookieValid: false,
						wasCookieSent: false,
					},
					data: {},
				};
				mainWindow.webContents.send(USER_DATA_EVENT, response);
			}
		})
		.catch((err) => {
			console.log("ERROR: While Getting Cookie.");
		});

	// let response = {
	//     message: { username: "", isCookieValid: false, isTimeOut: false },
	//     data: {},
	// };

	/**
	 * For Faster Dev of Feature, instead of making axios get req every time
	 * use Promise.resolve() version.
	 */
	// axios
	//     .get(API_URL, {
	//         timeout: 1000 * TIME_OUT_LIMIT,
	//         headers: { cookie: cookieHeaderString },
	//     })
	//     .then((res) => {
	//         console.log("Response Returned by Leetcode.");
	//         response = { ...response, data: { ...res.data } };
	//         response.message.username = res.data.user_name;
	//         if (response.message.username === "") {
	//             console.log("This Cookie is either invalid or expired.");
	//             response.message.isCookieValid = false;
	//             response.message.isTimeOut = false;
	//             mainWindow.webContents.send(USER_DATA_EVENT, response);
	//         } else {
	//             console.log("Hi", response.message.username);
	//             response.message.isCookieValid = true;
	//             response.message.isTimeOut = false;
	//             mainWindow.webContents.send(USER_DATA_EVENT, response);
	//         }
	//     })
	//     .catch((err) => {
	//         console.log("May be Request took long time to reply...", err);
	//         response.message.isTimeOut = true;
	//         response.message.isCookieValid = true; // Doesn't matter when isTimeOut = true
	//         mainWindow.webContents.send(USER_DATA_EVENT, response);
	//     });

	/**
	 * For Faster Dev of Feature, instead of making axios get req every time
	 * use below version.
	 */
	// Promise.resolve()
	//     .then(() => {
	//         response = { ...response, data: { ...smallResponse } };
	//         const res = { data: { user_name: "Tivan" } };
	//         console.log("Response Returned by Leetcode.");
	//         response = { ...response, ...res.data };
	//         response.message.username = res.data.user_name;
	//         if (response.message.username === "") {
	//             console.log("This Cookie is either invalid or expired.");
	//             response.message.isCookieValid = false;
	//             response.message.isTimeOut = false;
	//             mainWindow.webContents.send(USER_DATA_EVENT, response);
	//         } else {
	//             console.log("Hi", response.message.username);
	//             response.message.isCookieValid = true;
	//             response.message.isTimeOut = false;
	//             mainWindow.webContents.send(USER_DATA_EVENT, response);
	//         }
	//     })
	//     .catch((err) => {
	//         console.log("May be Request took long time to reply...", err);
	//         response.message.isTimeOut = true;
	//         response.message.isCookieValid = true; // Doesnot matter when isTimeOut = true
	//         mainWindow.webContents.send(USER_DATA_EVENT, response);
	//     });
});

ipcMain.handle(LOGOUT_EVENT, async (event) => {
	//To handle when "user-logout" event is invoked from UI renderer side(LogOut.js)
	try {
		await cookieJar.remove(
			//Removing the saved cookie
			"https://leetsolve.matrix.com",
			"MY_TASTY_COOKIE"
		);
		console.log("Cookie Removed");
		BrowserWindow.getFocusedWindow().reload(); //Reloading the window when logout is successful
		return "success";
	} catch (e) {
		console.log("Problem Removing the cookie", e);
		return "fail";
	}
});

// Spawning the Main Window
app.on("ready", createWindow);

// FOR-MAC-USERS: Quit when all windows are closed
app.on("window-all-closes", () => {
	if (process.platform != "darwin") {
		app.quit();
	}
});
