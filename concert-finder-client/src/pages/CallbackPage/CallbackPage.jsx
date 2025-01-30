import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import getNewAccessToken from "../../../utils/refreshToken";
import {
	exchangeCodeForToken,
	getUserProfile,
	getPlaylists,
	getPlaylistDetails,
	getBuddiesProfiles,
} from "../../../utils/userFunctions";
import Button from "../../components/Button/Button";
import "./CallbackPage.scss";

/* Bigger picture items/todos: */
//TODO: WE NEED TO ADD CONCERT SEARCHING FUNCTIONALITY!
//TODO: NOW THAT WE CAN SEE THE USERS, WE WANT TO ADD FUNCTIONALITY THAT ALLOWS THE USER TO SEND INVITES TO THEIR FRIENDS ABOUT SELECTED CONCERTS...

/* Not as urgent todos:*/
//TODO? CHANGE buttons into Button component?
// TODO: TURN List items INTO A CARD COMPONENT?...
//TODO: Make each playlist list-item the same size...

/* Fix mes based on urgency/priority */
//FIXME: Make sure that when we display the shared users, it doesn't appear for ALL playlists, only the one that was selected!

//FIXME: Might have to modify the check for access token rather than just setting a timer...

export default function CallbackPage() {
	const [profileData, setProfileData] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [searchParams] = useSearchParams();
	const [init, setInit] = useState(true);
	// const [playlistUsers, setPlaylistUsers] = useState(null);
	// const [friendsInfo, setFriendsInfo] = useState(null);
	// const [showList, setShowList] = useState(false);

	useEffect(() => {
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		if (code) {
			exchangeCodeForToken(code, state, init, setInit);
		}

		//once exchange for token occurs, grab user info to display (replaced button)
		if (localStorage.getItem("AccessToken")) {
			console.log("access token:", localStorage.getItem("AccessToken"));
			getUserProfile(profileData, setProfileData);
		}

		//sets timer for token refresh!
		const expiryTime = localStorage.getItem("ExpiryTime");
		if (expiryTime) {
			setTimeout(getNewAccessToken, expiryTime * 1000);
			console.log("set refresh token function with expiry time.");
		}
	}, []);

	// useEffect(() => {
	// 	if (playlistUsers) {
	// 		const arrUserList = Array.from(playlistUsers);
	// 		getBuddiesProfiles(arrUserList, friendsInfo, setFriendsInfo);
	// 	}
	// }, [playlistUsers]);

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
					text="My playlists"
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
								<li
									className="playlists__item"
									key={playlist.id}
									// onClick={() => {
									// 	getPlaylistDetails(
									// 		playlist.id,
									// 		playlistUsers,
									// 		setPlaylistUsers
									// 	);
									// 	setShowList(true);
									// }}
								>
									<section className="playlists__playlist">
										<Link className="playlists__url" to={`/playlists/${playlist.id}`}>
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
									{
									/* {showList && friendsInfo ? (
										<section className="friends">
											<h3 className="friends__header">Buddies in Playlist*</h3>
											<div className="friends__list-container">
												<ul className="friends__list">
													{friendsInfo.map((friend) => {
														return (
															<li className="friend" key={friend.id}>
																<p className="friend__name">
																	{friend.display_name}
																</p>
																<div
																	className={`friend__pic-div ${
																		friend.images.length == 0
																			? "friend__pic-div--default"
																			: ""
																	}`}
																>
																	<img
																		className="friend__pic"
																		src={
																			friend.images.length > 0
																				? friend.images[0].url
																				: ""
																		}
																	/>
																</div>
															</li>
														);
													})}
												</ul>
												<p className="friends__asterisk">
													<small>
														*List of users displayed may not be complete.
													</small>
												</p>
											</div>
										</section>
									) : (
										""
									)} */
									}
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

{
	/* {playlistUsers ? (
		<section>
			<h3>Buddies in Playlist*:</h3>
			<ul>
				{Array.from(playlistUsers).map((user) => {
					return (
						<li key={user}>
							<p>{user}</p>
						</li>
					);
				})}
			</ul>
			<p><small>*List of users displayed may not be complete.</small></p>
		</section>
	) : (
		""
	)} */
}
