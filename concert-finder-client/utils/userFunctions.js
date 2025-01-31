import axios from "axios";
import getNewAccessToken from "./refreshToken";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

async function exchangeCodeForToken(code, state, init, setInit) {
	try {
		const response = await axios.post(
			`${VITE_BASE_URL}:${VITE_PORT}/callback`,
			{
				code,
				state,
			}
		);
		localStorage.setItem("AccessToken", response.data.access_token);
		localStorage.setItem("RefreshToken", response.data.refresh_token);
		localStorage.setItem("ExpiryTime", response.data.expires_in);
		setInit(false);
		console.log("tokens exchanged!");
	} catch (error) {
		console.error(
			"Failed to exchange code for token or a new access token is required"
		);
		if (!init) {
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired"
				? getNewAccessToken()
				: "";
		}
	}
}

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

		const filteredPlaylist = response.data.items.filter(
			(playlist) => playlist.collaborative == true
		);
		setPlaylists(filteredPlaylist);
		return playlists;
	} catch (error) {
		console.error(
			"failed to get playlists",
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
		console.log("shared playlist:", response.data);
		return playlist;
	} catch (error) {
		console.error(
			"failed to get playlists",
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

async function getPlaylistDetails(playlistId, playlistUsers, setPlaylistUsers) {
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

		const setOfUsersList = new Set(usersList);
		// console.log("set of usersList?",setOfUsersList);
		setPlaylistUsers(setOfUsersList);
		return playlistUsers;
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
	console.log("playlist users in userFunctions?", playlistusers);
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

		console.log("list of users' info?", response.data);
		const shortenedList = [];
		response.data.filter((friend) => {
			let temp = {
				id: friend.id,
				display_name: friend.display_name,
				images: [...friend.images],
			};
			shortenedList.push(temp);
		});
		console.log("shortened list:", shortenedList);
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
	exchangeCodeForToken,
	getUserProfile,
	getPlaylists,
    getSinglePlaylist,
	getPlaylistDetails,
	getBuddiesProfiles,
};
