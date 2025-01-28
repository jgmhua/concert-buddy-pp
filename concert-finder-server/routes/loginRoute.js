import express from "express";
import querystring from "querystring";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL } = process.env;

const generateRandomString = (length = 16) => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

let state = generateRandomString();

router.get("/", async (req, res) => {
	let scope = "user-read-private user-read-email";
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
	const scope = "user-read-private user-read-email user-top-read";

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
