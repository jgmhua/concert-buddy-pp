import axios from "axios";
import express from "express";
const router = express.Router();

function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

//FIXME: NOT SURE WHAT'S GOING ON, BUT SOME OF THE ROUTES I WROTE YESTERDAY HAVE DISAPPEARED :(

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
		res.send(userData.data);
	} catch (error) {
		console.error("Error fetching profile");
		res.status(500).send(error);
	}
});

router.post("/profiles", async (req, res) => {
	const authHeader = req.headers.authorization;
	const access_token = authHeader.split(" ")[1];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Missing or invalid Authorization header" });
	}

	if (!req.body) {
		return res
			.status(401)
			.json({ error: "Missing or invalid list of buddies" });
	}

	let listInfo = [];
	//NOTE: req.body is an object!
	const friendList = req.body;
	for (const property in friendList) {
		// console.log(`${property}: ${friendList[property]}`);
		let friendData = await axios.get(
			`https://api.spotify.com/v1/users/${friendList[property]}`,
			{
				headers: {
					Authorization: "Bearer " + access_token,
				},
			}
		);
		// delay(1000).then(() => console.log('hopefully this helps with the API rate limit... 1s delay'));
		listInfo = [...listInfo, friendData.data];
	}
	res.status(200).send(listInfo);
});

router.get("/playlists", async (req, res) => {
	const authHeader = req.headers.authorization;
	const access_token = authHeader.split(" ")[1];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Missing or invalid Authorization header" });
	}

	try {
		const userPlaylists = await axios.get(
			`https://api.spotify.com/v1/me/playlists`,
			{
				headers: {
					Authorization: "Bearer " + access_token,
				},
			}
		);
		return res.send(userPlaylists.data);
	} catch (error) {
		console.error("Error fetching user's playlists", error.response);
		return res.status(500).send(error.response);
	}
});

router.get("/playlists/:playlist_id", async (req, res) => {
	const { playlist_id } = req.params;
	const authHeader = req.headers.authorization;
	const access_token = authHeader.split(" ")[1];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Missing or invalid Authorization header" });
	}

	try {
		const playlistDetails = await axios.get(
			`https://api.spotify.com/v1/playlists/${playlist_id}`,
			{
				headers: {
					Authorization: "Bearer " + access_token,
				},
			}
		);
		return res.send(playlistDetails.data);
	} catch (error) {
		console.error("Error fetching playlist details", error.response);
		return res.status(500).json(error.response);
	}
});

export default router;
