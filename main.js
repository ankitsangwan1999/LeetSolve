import "regenerator-runtime/runtime"; // To be able to use async-await syntax
const { app, BrowserWindow, ipcMain, shell, session } = require("electron");
const path = require("path");
const url = require("url");
const axios = require("axios");
import checkCookieValidity from "./src/api/CheckCookieValidity";
import { API_URL, TIME_OUT_LIMIT } from "./src/Constants";

// for DEV purpose only
import smallResponse from "./src/DummyData/smallResponse";

// init mainWindow of the Application
let mainWindow, cookieJar;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
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
ipcMain.on("handle-form", async (e, cookie) => {
	cookie = cookie.trim();
	console.log("Server: Received handle-form event with cookie:", cookie);
	const cookieHeaderString = `LEETCODE_SESSION=${cookie};`;

	try {
		// await cookieJar.remove({
		//     url: "https://leetsolve.com",
		//     name: "MY_TASTY_COOKIE",
		// });
		// console.log("Cookie Removed");

		const response = await checkCookieValidity(cookieHeaderString);
		response.message.wasCookieSent = true;
		// Store this Cookie
		cookieJar
			.set({
				url: "https://leetsolve.com",
				name: "MY_TASTY_COOKIE",
				value: cookie,
				domain: ".leetsolve.com",
				expirationDate: (() => {
					let currMilliSeconds = new Date();
					currMilliSeconds += 84600;
					return currMilliSeconds / 1000;
				})(),
				httpOnly: true,
				secure: true,
				strict: true,
				sameSite: "strict",
				session: false,
			})
			.then(() => {
				console.log("Cookies Set.");
				cookieJar
					.get({
						url: "https://leetsolve.com",
						name: "MY_TASTY_COOKIE",
					})
					.then((cookies) => {
						console.log("Showing All Cookies now:");
						cookies.map((cookie) => {
							console.log("here is it:", cookie.expirationDate);
						});
						console.log(cookies.length);
					})
					.catch((err) => {
						console.log("ERROR: While Getting All Cookie Values");
					});
				mainWindow.webContents.send("user-data", response);
			})
			.catch((err) => {
				console.log("ERROR: While Setting Cookie.");
			});
	} catch (response) {
		response.message.wasCookieSent = true;

		// Do not Store this Cookie
		console.log(
			"This Cookie is either invalid or expired./Req Timed Out",
			response
		);
		mainWindow.webContents.send("user-data", response);
	}
});

// Catch user-data event emitted by Client
ipcMain.on("user-data", async (e) => {
	// TESTING BEGINS
	// cookieJar
	//     .set({
	//         url: "https://leetsolve.com",
	//         name: "MY_TASTY_COOKIE",
	//         value: <ENTER_YOUR_COOKIE_HERE>,
	//         domain: "leetsolve.com",
	//     })
	//     .then(() => {
	//         console.log("Cookies Set.");
	//     })
	//     .catch((err) => {
	//         console.log("Can't Set");
	//     });

	// TESTING ENDS

	cookieJar
		.get({ url: "https://leetsolve.com", name: "MY_TASTY_COOKIE" })
		.then(async (cookies) => {
			if (cookies.length !== 0) {
				const cookieObj = cookies[0];
				console.log("Yea... Your Cookie is Here:");
				const cookieHeaderString = `LEETCODE_SESSION=${cookieObj.value};`;
				try {
					const response = await checkCookieValidity(
						cookieHeaderString
					);
					mainWindow.webContents.send("user-data", response);
				} catch (response) {
					console.log(
						"That Sounds Weird but I will allow it.",
						response
					);
					mainWindow.webContents.send("user-data", response);
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
				mainWindow.webContents.send("user-data", response);
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
	//             mainWindow.webContents.send("user-data", response);
	//         } else {
	//             console.log("Hi", response.message.username);
	//             response.message.isCookieValid = true;
	//             response.message.isTimeOut = false;
	//             mainWindow.webContents.send("user-data", response);
	//         }
	//     })
	//     .catch((err) => {
	//         console.log("May be Request took long time to reply...", err);
	//         response.message.isTimeOut = true;
	//         response.message.isCookieValid = true; // Doesn't matter when isTimeOut = true
	//         mainWindow.webContents.send("user-data", response);
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
	//             mainWindow.webContents.send("user-data", response);
	//         } else {
	//             console.log("Hi", response.message.username);
	//             response.message.isCookieValid = true;
	//             response.message.isTimeOut = false;
	//             mainWindow.webContents.send("user-data", response);
	//         }
	//     })
	//     .catch((err) => {
	//         console.log("May be Request took long time to reply...", err);
	//         response.message.isTimeOut = true;
	//         response.message.isCookieValid = true; // Doesnot matter when isTimeOut = true
	//         mainWindow.webContents.send("user-data", response);
	//     });
});

// Spawning the Main Window
app.on("ready", createWindow);

// FOR-MAC-USERS: Quit when all windows are closed
app.on("window-all-closes", () => {
	if (process.platform != "darwin") {
		app.quit();
	}
});
