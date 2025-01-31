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
import { getEventsByArtists } from "../../../utils/eventsFunctions";
import Button from "../../components/Button/Button";
import "./PlaylistDetailsPage.scss";

//TODO: create modal that opens for friends invite -- users can select/de-select certain friends too

export default function PlaylistDetailsPage() {
	const { playlistId } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [playlistUsers, setPlaylistUsers] = useState(null);
	const [friendsInfo, setFriendsInfo] = useState(null);
	const [artistsList, setArtistsLists] = useState(null);
	const [eventsList, setEventsLists] = useState(null);

	function findConcerts() {
		getEventsByArtists(artistsList, eventsList, setEventsLists);
	}

	function openModal() {
		console.log("I also do nothing at the moment!");
	}

	useEffect(() => {
		getSinglePlaylist(playlistId, playlist, setPlaylist);
		getPlaylistDetails(
			playlistId,
			playlistUsers,
			setPlaylistUsers,
			artistsList,
			setArtistsLists
		);
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
						<section className="playlist__top-artists">
							{artistsList ? (
								<>
									<h3>Top Artists in Playlist</h3>
									<ul>
										{artistsList.map((artist) => {
											return (
												<li>
													<p>{artist}</p>
												</li>
											);
										})}
									</ul>
								</>
							) : (
								""
							)}
						</section>
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
				{eventsList ? (
					<ul className="concerts__list">
						{eventsList.map((event) => {
							return (
								<li key={event.id} className="concert">
									<div className="concert__image-div">
										<img className="concert__image" src={event.images} />
									</div>
									<h4 className="concert__name">{event.name}</h4>
									<div className="concert__info">
										<p className="concert__text">
											<span className="concert__text concert__text--bold">
												Date:{" "}
											</span>
											{event.dates.start.localDate}
										</p>
										<p className="concert__text">
											<span className="concert__text concert__text--bold">
												Location:{" "}
											</span>
											{event.venues.venues[0].city.name}
										</p>
										<p className="concert__text">
											<span className="concert__text concert__text--bold">
												Venue:{" "}
											</span>
											{event.venues.venues[0].name}
										</p>
									</div>
									<div className="concert__btns">
										<Button
											text="📧"
											handleFunc={openModal}
											btnType="no-borders"
										/>
										<Button
											text="↗"
											handleFunc={openModal}
											btnType="no-borders"
										/>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					""
				)}
			</section>
		</article>
	);
}
