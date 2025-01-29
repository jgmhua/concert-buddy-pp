import axios from "axios";
import express from "express";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;

router.get("/", async (req, res) => {
	const refresh_token = req.query.refresh_token;
	if (!refresh_token) {
		return res.status(400).json({ error: "Missing refresh token" });
	}

	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: refresh_token,
			}).toString(),
			{
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
				},
			}
		);

		if (response.status === 200) {
			const { access_token } = response.data;
			const new_refresh_token = response.data.refresh_token || refresh_token;
			res.json({
				access_token: access_token,
				refresh_token: new_refresh_token,
			});
		}
	} catch (error) {
		console.error(
			"Error refreshing token:",
			error.response?.data || error.message
		);
		res.status(500).json(error);
	}
});

export default router;

// try{
// const authHeader =
// "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64");

// const authOptions = {
// 	url: "https://accounts.spotify.com/api/token",
// 	method: "post",
// 	headers: {
// 		"Content-Type": "application/x-www-form-urlencoded",
// 		Authorization: authHeader,
// 	},
// 	data: new URLSearchParams({
// 		grant_type: "refresh_token",
// 		refresh_token: refresh_token,
// 	}).toString(),
// };
// const response = await axios(authOptions);
// if (response.status === 200) {
//     const { access_token } = response.data;
//     const new_refresh_token = response.data.refresh_token || refresh_token;
//     res.json({
//         access_token: access_token,
//         refresh_token: new_refresh_token,
//     });
// }
// } catch (error) {
// console.error(
//     "Error refreshing token:",
//     error.response?.data || error.message
// );
// res.status(500).json(error);
// }