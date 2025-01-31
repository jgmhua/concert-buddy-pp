import axios from "axios";
import express from "express";
const router = express.Router();

const { TICKETMASTER_API_KEY } = process.env;

//Note: currently filtered by city and country, but unsure if sort by relevance is working... 
router.post("/playlist", async (req, res) => {
    const { artistsList } = req.body;
	let events = [];

    //Note: MUST search by single artist using Ticketmaster API!
	for (let i = 0; i < artistsList.length; i++) {
		let artist = artistsList[i];
		let response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${artist}&city=Toronto&country=Canada&sort=relevance,desc&apikey=${TICKETMASTER_API_KEY}`
		);
		events = [...events, response.data["_embedded"]];
	}

	if (events.length == 0) {
		return res.status(404).send({ message: "no events found." });
	}
	res.send({ events });
});

export default router;
