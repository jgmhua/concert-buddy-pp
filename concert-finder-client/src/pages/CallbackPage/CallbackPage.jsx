import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import getNewAccessToken from "../../../utils/refreshToken";

//TODO: Change harded coded urls into .env variables
//TODO: Would be great if we could grab the shared users of the shared playlists and their avatars to display...
//FIXME: Might have to modify the check for access token rather than just setting a timer...

export default function CallbackPage() {
	const [profileData, setProfileData] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [playlistUsers, setPlaylistUsers] = useState(null);
	const [sharedPlaylist, setSharedPlaylist] = useState(null);
	const [searchParams] = useSearchParams();
	const [isTokenExpired, setIsTokenExpired] = useState(false);

	useEffect(() => {
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		if (code) {
			exchangeCodeForToken(code);
		}

		const expiryTime = localStorage.getItem("ExpiryTime");
		if (expiryTime) {
			setTimeout(getNewAccessToken, expiryTime * 1000);
		}
	}, []);

	async function exchangeCodeForToken(code, state) {
		try {
			const response = await axios.post("http://localhost:8080/callback", {
				code,
				state,
			});
			localStorage.setItem("AccessToken", response.data.access_token);
			localStorage.setItem("RefreshToken", response.data.refresh_token);
			localStorage.setItem("ExpiryTime", response.data.expires_in);
		} catch (error) {
			console.error(
				"Failed to exchange code for token or a new access token is required"
			);
			if (
				error.response.data.error === "invalid_grant" ||
				error.response.data.error_description === "Authorization code expired"
			) {
				getNewAccessToken();
			}
		}
	}

	async function getUserProfile() {
		const access_token = localStorage.getItem("AccessToken");
		if (!access_token) {
			console.error("Access token not found");
			return;
		}
		try {
			const response = await axios.get("http://localhost:8080/user/profile", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			setProfileData(response.data);
			return profileData;
		} catch (error) {
			console.error(
				"fail to get profile",
				error.response?.data || error.message
			);

			//HOPEFULLY THIS WORKS?
			if (
				error.response.data.error === "invalid_grant" ||
				error.response.data.error_description === "Authorization code expired"
			) {
				getNewAccessToken();
			}
		}
	}

	async function getPlaylists() {
		const access_token = localStorage.getItem("AccessToken");
		if (!access_token) {
			console.error("Access token not found");
			return;
		}
		try {
			const response = await axios.get("http://localhost:8080/user/playlists", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});

			const filteredPlaylist = response.data.items.filter(
				(playlist) => playlist.collaborative == true
			);
			console.log("filtered playlists?", filteredPlaylist);
			setPlaylists(filteredPlaylist);
			// setPlaylists(response.data);
			return playlists;
		} catch (error) {
			console.error(
				"failed to get playlists",
				error.response?.data || error.message
			);

			//HOPEFULLY THIS WORKS?
			if (
				error.response.data.error === "invalid_grant" ||
				error.response.data.error_description === "Authorization code expired"
			) {
				getNewAccessToken();
			}
		}
	}

	async function getPlaylistDetails(playlistId) {
		const access_token = localStorage.getItem("AccessToken");
		if (!access_token) {
			console.error("Access token not found");
			return;
		}
		try {
			const response = await axios.get(
				`http://localhost:8080/user/playlists/${playlistId}`,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			const usersList = [];
			response.data.items.map((track) => usersList.push(track.added_by.id));
			const setUsersList = new Set(usersList);

			console.log("all users?", setUsersList);
			setPlaylistUsers(setUsersList);
			return playlistUsers;
		} catch (error) {
			console.error(
				"failed to get playlists",
				error.response?.data || error.message
			);

			//HOPEFULLY THIS WORKS?
			if (
				error.response.data.error === "invalid_grant" ||
				error.response.data.error_description === "Authorization code expired"
			) {
				getNewAccessToken();
			}
		}
	}

	async function getSinglePlaylist() {
		const access_token = localStorage.getItem("AccessToken");
		if (!access_token) {
			console.error("Access token not found");
			return;
		}
		try {
			const response = await axios.get(
				"http://localhost:8080/user/playlists/37i9dQZF1EJyFxg8aeaPAD",
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			);
			setSharedPlaylist(response.data);
			console.log("shared playlist:", response.data);
			return sharedPlaylist;
		} catch (error) {
			console.error(
				"failed to get playlists",
				error.response?.data || error.message
			);

			//HOPEFULLY THIS WORKS?
			if (
				error.response.data.error === "invalid_grant" ||
				error.response.data.error_description === "Authorization code expired"
			) {
				getNewAccessToken();
			}
		}
	}
	// if (profileData === null) {
	//     return(<div>Authenticating...</div>);
	// }

	return (
		<>
			<button onClick={getUserProfile}>Get my info!</button>
			{profileData ? (
				<section>
					<p>Username: {profileData.display_name}</p>
					<p>Email: {profileData.email}</p>
				</section>
			) : (
				""
			)}
			<button onClick={getPlaylists}>Show me my playlists!</button>
			{playlists ? (
				<ul>
					<h2>Shared Playlists: {playlists.total}</h2>
					{playlists.map((playlist) => {
						return (
							<li
								key={playlist.id}
								onClick={() => getPlaylistDetails(playlist.id)}
							>
								<img src={playlist.images[0].url} />
								<p>{playlist.name}</p>
								<p>tracks:{playlist.tracks.total}</p>
								<p>URL:{playlist.uri}</p>
							</li>
						);
					})}
				</ul>
			) : (
				""
			)}
			{/* <button onClick={getSinglePlaylist}>Show me our shared playlist!</button> */}
			{playlistUsers ? (
				<>
					<h3>Playlist users:</h3>
					<ul>
						{Array.from(playlistUsers).map((user) => {
							return (
								<li key={user}>
									<p>{user}</p>
								</li>
							);
						})}
					</ul>
				</>
			) : (
				""
			)}
		</>
	);
}
