import express from "express";
import querystring from "querystring";
import generateRandomString from "../utils/randomStringGenerator.js";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL } = process.env;
let scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative";

let state = generateRandomString();
console.log("state:", state);

router.get("/", async (req, res) => {
	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: CLIENT_ID,
				scope: scope,
				redirect_uri: REDIRECT_URL,
				state: state,
			})
	);
});

router.get("/url", (req, res) => {
	const state = generateRandomString();

	const spotifyAuthUrl =
		"https://accounts.spotify.com/authorize?" +
		querystring.stringify({
			response_type: "code",
			client_id: CLIENT_ID,
			scope: scope,
			redirect_uri: REDIRECT_URL,
			state: state,
		});

	res.json({ url: spotifyAuthUrl });
});

export default router;

// const generateRandomString = (length = 16) => {
// 	const characters =
// 		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// 	let result = "";
// 	for (let i = 0; i < length; i++) {
// 		result += characters.charAt(Math.floor(Math.random() * characters.length));
// 	}
// 	return result;
// };