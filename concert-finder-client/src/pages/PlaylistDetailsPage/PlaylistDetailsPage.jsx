import { useEffect, useState } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import getNewAccessToken from "../../../utils/refreshToken";
import {
	exchangeCodeForToken,
	getUserProfile,
	getPlaylists,
	getSinglePlaylist,
	getPlaylistDetails,
	getBuddiesProfiles,
} from "../../../utils/userFunctions";
import Button from "../../components/Button/Button";
import "./PlaylistDetailsPage.scss";

//TODO: create modal that opens for friends invite -- users can select/de-select certain friends too

export default function PlaylistDetailsPage() {
	const { playlistId } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [playlistUsers, setPlaylistUsers] = useState(null);
	const [friendsInfo, setFriendsInfo] = useState(null);

	function findConcerts() {
		console.log("I do nothing at the moment!");
	}

	function openModal() {
		console.log("I also do nothing at the moment!");
	}

	useEffect(() => {
		getSinglePlaylist(playlistId, playlist, setPlaylist);
		getPlaylistDetails(playlistId, playlistUsers, setPlaylistUsers);
	}, []);

	useEffect(() => {
		if (playlistUsers) {
			const arrUserList = Array.from(playlistUsers);
			getBuddiesProfiles(arrUserList, friendsInfo, setFriendsInfo);
		}
	}, [playlistUsers]);

	return (
		<article className="playlist">
			<section className="playlist__overview">
				{playlist ? (
					<>
						<Link className="playlist__url" to={playlist.uri}>
							<h1 className="playlist__text">{playlist.name}</h1>
							<img className="playlist__cover" src={playlist.images[0].url} />
							<p className="playlist__text playlist__text--details">
								Total tracks: {playlist.tracks.total}
							</p>
						</Link>
					</>
				) : (
					""
				)}
			</section>
			{friendsInfo ? (
				<section className="friends">
					<h3 className="friends__header">Buddies in Playlist*</h3>
					<div className="friends__list-container">
						<ul className="friends__list">
							{friendsInfo.map((friend) => {
								return (
									<li className="friend" key={friend.id}>
										<p className="friend__name">{friend.display_name}</p>
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
													friend.images.length > 0 ? friend.images[0].url : ""
												}
											/>
										</div>
									</li>
								);
							})}
						</ul>
						<p className="friends__asterisk">
							<small>*List of users displayed may not be complete.</small>
						</p>
					</div>
				</section>
			) : (
				<p>Loading... </p>
			)}
			<Button
				text="Find concerts suggestions!"
				handleFunc={() => {
					findConcerts();
				}}
			/>
			<section className="concerts">
				<h2 className="concerts__header">Suggested Concerts</h2>
				<ul className="concerts__list">
					<li className="concerts__item">
						<p>Name</p>
						<Button text="Invite Friends to Concert!" handleFunc={openModal} />
					</li>
				</ul>
			</section>
		</article>
	);
}
