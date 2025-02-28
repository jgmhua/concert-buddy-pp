import axios from "axios";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

async function getEventsByArtists(artistsList, eventsList, setEventsLists) {
	try {
		const response = await axios.post(
			`${VITE_BASE_URL}:${VITE_PORT}/events/playlist`,
			{ artistsList: artistsList }
		);

		const shortenedList = [];
		/*NOTE: values we want to display:
            name, id, dates, venues (but it's in _embedded), city and name (in venues), images[0].url,
        */

		const artistsEvents = [];
		response.data.events.map((artist) => {
			if (artist != null) {
				artistsEvents.push(artist);
			}
		});

		artistsEvents.map((artist) => {
            artist.events.map((event)=>{
                // let tempVenues = event["_embedded"]
                let temp = {
                    id: event.id,
                    name: event.name,
                    url: event.url,
                    dates: event.dates,
                    images: event.images[0].url,
                    venues: event["_embedded"],
                };
                shortenedList.push(temp);
            })
		});
		console.log(shortenedList);
		setEventsLists(shortenedList);
		return eventsList;
	} catch (error) {
		console.error(
			"failed to get events by artists",
			error.response?.data || error.message
		);
	}
}

export { getEventsByArtists };
