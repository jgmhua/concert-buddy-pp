import axios from "axios";
import express from "express";
import querystring from "querystring";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;

router.get("/profile", async (req, res) => {
	const authHeader = req.headers.authorization;
	const access_token = authHeader.split(" ")[1];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Missing or invalid Authorization header" });
	}

	try {
		const userData = await axios.get("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: "Bearer " + access_token,
			},
		});
		console.log(userData.data, "user's profile data");
		res.status(200).send(userData.data);
	} catch (error) {
		console.error("Error fetching profile");
		res.status(500).send(error);
		// res.status(500).send("Failed to fetch profile.");
	}
});

router.get("/playlists", async (req, res) => {
	const authHeader = req.headers.authorization;
	const access_token = authHeader.split(" ")[1];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Missing or invalid Authorization header" });
	}

	// try {
		const userPlaylists = await axios.get(
			`https://api.spotify.com/v1/me/playlists`,
			{
				headers: {
					Authorization: "Bearer " + access_token,
				},
			}
		);
    console.log("user's playlists:", userPlaylists);
    // res.json({userPlaylists});
    res.send(userPlaylists.data);
    console.log("User's playlists:", JSON.stringify(userPlaylists.data, null, 2));

	// } catch (error) {
  //   console.error("Error fetching user's playlists");
	// 	res.status(500).send(error);
  // }
});

export default router;
