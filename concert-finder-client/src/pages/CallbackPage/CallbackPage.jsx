import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
	exchangeCodeForToken,
	getNewAccessToken,
} from "../../../utils/authAndTokens";
import { getUserProfile, getPlaylists } from "../../../utils/userFunctions";
import Button from "../../components/Button/Button";
import "./CallbackPage.scss";

/* Bigger picture items/todos: */
//TODO: NOW THAT WE CAN SEE THE USERS, WE WANT TO ADD FUNCTIONALITY THAT ALLOWS THE USER TO SEND INVITES TO THEIR FRIENDS ABOUT SELECTED CONCERTS...

/* Not as urgent todos:*/
//TODO? CHANGE buttons into Button component?
// TODO: TURN List items INTO A CARD COMPONENT?...
//TODO: Make each playlist list-item the same size...

/* Fix mes based on urgency/priority */
//FIXME: Might have to modify the check for access token rather than just setting a timer...

export default function CallbackPage() {
	const [profileData, setProfileData] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		if (code) {
			exchangeCodeForToken(code, state);
		}

		//once exchange for token occurs, grab user info to display (replaced button)
		if (localStorage.getItem("AccessToken")) {
			if (Date.now() > localStorage.getItem("ExpiryTime")) {
				console.log("Access token expired. Refreshing...");
				getNewAccessToken();
			}
			getUserProfile(profileData, setProfileData);
		}
	}, []);

	return (
		<article className="callback">
			<section className="user-info">
				{profileData ? (
					<>
						<h1 className="user-info__text">
							<span className="user-info__text user-info__text--bold">
								Welcome
							</span>{" "}
							{profileData.display_name}
						</h1>
						<p className="user-info__text">
							<span className="user-info__text user-info__text--bold">
								Email:
							</span>{" "}
							{profileData.email}
						</p>
					</>
				) : (
					""
				)}
			</section>
			<section className="callback__actions">
				<Button
					text="See Playlists with Buddies"
					handleFunc={() => getPlaylists(playlists, setPlaylists)}
				/>
			</section>
			{playlists ? (
				<section className="playlists">
					<h2 className="playlists__header">
						Shared Playlists {playlists.total}
					</h2>
					<ul className="playlists__shared-list">
						{playlists.map((playlist) => {
							return (
								<li className="playlists__item" key={playlist.id}>
									<section className="playlists__playlist">
										<Link
											className="playlists__url"
											to={`/playlists/${playlist.id}`}
										>
											<h3 className="playlists__text">{playlist.name}</h3>
											<img
												className="playlists__cover"
												src={playlist.images[0].url}
											/>
											<p className="playlists__text playlists__text--details">
												Total tracks: {playlist.tracks.total}
											</p>
										</Link>
									</section>
								</li>
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
