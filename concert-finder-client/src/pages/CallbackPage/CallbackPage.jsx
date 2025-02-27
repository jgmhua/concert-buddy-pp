import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
	exchangeCodeForToken,
	getNewAccessToken,
} from "../../../utils/authAndTokens";
import { getUserProfile, getPlaylists } from "../../../utils/userFunctions";
import Button from "../../components/Button/Button";
import "./CallbackPage.scss";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";

/* Bigger picture items/todos: 
//TODO: ADD FUNCTIONALITY - SEND CONCERT INVITES FRIENDS

// Not as urgent/lower priority todos:
*/

/* Fix-mes based on urgency/priority: 
//FIXME: Fix refresh token check & function!
//FIXME: Might have to modify the check for access token rather than just setting a timer...
*/

export default function CallbackPage() {
	const [profileData, setProfileData] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [grabAccessToken, setGrabAccessToken] = useState(false);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		if (code) {
			exchangeCodeForToken(code, state);
			setGrabAccessToken(true);
		}

		if (localStorage.getItem("AccessToken")) {
			if (Date.now() > localStorage.getItem("ExpiryTime")) {
				console.log("Access token expired. Refreshing...");
				getNewAccessToken();
			}
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem("AccessToken") && grabAccessToken) {
			getUserProfile(profileData, setProfileData);
			console.log("grabbed pofile?");
		} else {
			console.log("did not grab");
		}
	}, [grabAccessToken]);

	return (
		<article className="callback">
			{profileData ? (
				<section className="user">
					<h1 className="user user--name">
						Welcome
						<strong>{profileData.display_name}</strong>
					</h1>
					<div className="user user--email">
						<h4>
							Email: <span className="user__text">{profileData.email}</span>
						</h4>
					</div>
				</section>
			) : (
				""
			)}
			<section className="callback__actions">
				<Button
					text="See Playlists with Buddies"
					handleFunc={() => getPlaylists(playlists, setPlaylists)}
				/>
			</section>
			{playlists ? (
				<section className="playlists">
					<h2 className="playlists__header">
						My Shared Playlists {playlists.total}
					</h2>
					<ul className="playlists__list">
						{playlists.map((playlist) => {
							return (
								<PlaylistCard
									id={playlist.id}
									name={playlist.name}
									image={playlist.images[0].url}
									tracksTotal={playlist.tracks.total}
								/>
							);
						})}
					</ul>
				</section>
			) : (
				""
			)}
		</article>
	);
}
