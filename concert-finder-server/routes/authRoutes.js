import express from "express";
import querystring from "querystring";
import axios from "axios";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;

//NOTE: this is the route we're currently using - loggedRoutes at the moment isn't being used
//this is the first step
router.get("/", async (req, res) => {
	let code = req.query.code || null;
	let state = req.query.state || null;

	if (state === null || state !== state) {
		return res.redirect(
			"/#" + querystring.stringify({ error: "state_mismatch" })
		);
	}
	// Exch auth code for access & refresh tokens
	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				code: code,
				redirect_uri: REDIRECT_URL,
				grant_type: "authorization_code",
			}).toString(),
			{
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
				},
			}
		);

		console.log("response:", response.data);
        // Use the access token to fetch user info
		const { access_token, refresh_token } = response.data;
		const userResponse = await axios.get("https://api.spotify.com/v1/me", {
			headers: { Authorization: `Bearer ${access_token}` },
		});

		const { display_name, email } = userResponse.data;
		res.json({
            user: { "display_name": display_name, "email": email },
			tokens: { "access_token": access_token, "refresh_token": refresh_token },
		});

        // res.send(response.data);
	} catch (error) {
		console.error("Error fetching token:", error);
		res.status(500).send("Failed to exchange code for tokens.");
	}
});

export default router;
