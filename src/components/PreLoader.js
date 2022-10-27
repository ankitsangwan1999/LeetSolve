import React, { useEffect, useRef } from "react";

const PreLoader = () => {
	const canvas = useRef(null);
	useEffect(() => {
		const ctx = canvas.current.getContext("2d");
		canvas.current.width = window.innerWidth;
		canvas.current.height = window.innerHeight;
		canvas.current.style.position = "absolute";
		canvas.current.style.zIndex = -1;
		document.body.style.background = "transparent";

		let letters =
			"ABCDEFGHIJKLMNOPQRSTUVXYZ".repeat(10);
		letters = letters.split("");

		let fontSize = 10,
			columns = canvas.current.width / fontSize;

		// Setting up the drops
		let drops = [];
		for (var i = 0; i < columns; ++i) {
			drops.push(canvas.current.height * Math.random());
		}

		const draw = () => {
			if (
				canvas === null ||
				canvas.current === undefined ||
				canvas.current === null
			)
				return;
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
			for (let i = 0; i < drops.length; ++i) {
				let rand = Math.random();
				let character =
					letters[Math.floor(Math.random() * letters.length)];
				ctx.fillStyle = "#39FF14";
				ctx.fillText(character, i * fontSize, drops[i] * fontSize);
				if (
					drops[i] * fontSize > canvas.current.height &&
					Math.random() > 0.95
				) {
					drops[i] = 0;
				}
				++drops[i];
			}
		};
		let intervalId = setInterval(draw, 40);
		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return <canvas ref={canvas}></canvas>;
};

export default PreLoader;
