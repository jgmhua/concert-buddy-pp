import express from "express";
import querystring from "querystring";
import generateRandomString from "../utils/randomStringGenerator.js";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL } = process.env;
let scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative";

let state = generateRandomString();

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

router.get("/url", (_req, res) => {
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
