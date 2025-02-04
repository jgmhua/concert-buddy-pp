import axios from "axios";
import { getNewAccessToken } from "./authAndTokens";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

async function getUserProfile(profileData, setProfileData) {
	const access_token = localStorage.getItem("AccessToken");
	if (!access_token) {
		console.error("Access token not found");
		return;
	}
	try {
		const response = await axios.get(
			`${VITE_BASE_URL}:${VITE_PORT}/user/profile`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		setProfileData(response.data);
		return profileData;
	} catch (error) {
		console.error("fail to get profile", error.response?.data || error.message);

		if (
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired"
		) {
			getNewAccessToken();
		}
	}
}

async function getPlaylists(playlists, setPlaylists) {
	const access_token = localStorage.getItem("AccessToken");
	if (!access_token) {
		console.error("Access token not found");
		return;
	}
	try {
		const response = await axios.get(
			`${VITE_BASE_URL}:${VITE_PORT}/user/playlists`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);

		// const filteredPlaylist= response.data.items

	
		setPlaylists(response.data.items);
		return playlists;
	} catch (error) {
		console.error(
			"failed to get playlists",
			error.response?.data || error.message
		);

		if (
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired" ||
			error.response.data.status === 401
		) {
			getNewAccessToken();
		}
	}
}

async function getSinglePlaylist(playlistId, playlist, setPlaylist) {
	const access_token = localStorage.getItem("AccessToken");
	if (!access_token) {
		console.error("Access token not found");
		return;
	}
	try {
		const response = await axios.get(
			`${VITE_BASE_URL}:${VITE_PORT}/user/playlists/${playlistId}`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		setPlaylist(response.data);
		return playlist;
	} catch (error) {
		console.log(error.response.data.error.status)
		console.error(
			"failed to get playlists",
			error.response?.data || error.message
		);

		if (
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired" ||
			error.response.data.error_description === "The access token expired"
		) {
			getNewAccessToken();
		}
	}
}

async function getPlaylistDetails(
	playlistId,
	playlistUsers,
	setPlaylistUsers,
	artistsList,
	setArtistsLists
) {
	console.log("playlistId in userFunctions?", playlistId);
	const access_token = localStorage.getItem("AccessToken");
	if (!access_token) {
		console.error("Access token not found");
		return;
	}
	try {
		const response = await axios.get(
			`${VITE_BASE_URL}:${VITE_PORT}/user/playlists/${playlistId}`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		const usersList = [];
		response.data.tracks.items.map((track) =>
			usersList.push(track.added_by.id)
		);

		const filteredArtists = [];
		const tracks = response.data.tracks.items;
		tracks.map((track) => filteredArtists.push(track.track.artists[0].name));

		//sort artists by most popular
		function sortByFrequency(arr) {
			// Step 1: Create a frequency map using Map()
			const frequencyMap = new Map();
			arr.forEach((item) => {
				frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
			});
			const frequencyArray = Array.from(frequencyMap.entries());
			// Step 2: Convert map to an array and sort by frequency
			return frequencyArray.sort((a, b) => b[1] - a[1]).map((item) => item[0]);
		}

		const sortedList = sortByFrequency(filteredArtists);
		setArtistsLists(sortedList.slice(0, 5));

		const setOfUsersList = new Set(usersList);
		setPlaylistUsers(setOfUsersList);
		return playlistUsers, artistsList;
	} catch (error) {
		console.error(
			"failed to get playlist details",
			error.response?.data || error.message
		);

		if (
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired"
		) {
			getNewAccessToken();
		}
	}
}

async function getBuddiesProfiles(playlistusers, friendsInfo, setFriendsInfo) {
	const access_token = localStorage.getItem("AccessToken");
	if (!access_token) {
		console.error("Access token not found");
		return;
	}
	try {
		const response = await axios.post(
			`${VITE_BASE_URL}:${VITE_PORT}/user/profiles`,
			{ ...playlistusers },
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);

		const shortenedList = [];
		response.data.filter((friend) => {
			let temp = {
				id: friend.id,
				display_name: friend.display_name,
				images: [...friend.images],
			};
			shortenedList.push(temp);
		});

		setFriendsInfo(shortenedList);
		return friendsInfo;
	} catch (error) {
		console.error(
			"failed to get buddies info",
			error.response?.data || error.message
		);
		if (
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired"
		) {
			getNewAccessToken();
		}
	}
}

export {
	getUserProfile,
	getPlaylists,
	getSinglePlaylist,
	getPlaylistDetails,
	getBuddiesProfiles,
};
