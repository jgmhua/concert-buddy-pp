import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkAccessToken } from "../../../utils/authAndTokens";
import {
	getSinglePlaylist,
	getPlaylistDetails,
	getBuddiesProfiles,
} from "../../../utils/userFunctions";
import { getEventsByArtists } from "../../../utils/eventsFunctions";
import Button from "../../components/Button/Button";
import "./PlaylistDetailsPage.scss";

export default function PlaylistDetailsPage() {
	const { playlistId } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [playlistUsers, setPlaylistUsers] = useState(null);
	const [friendsInfo, setFriendsInfo] = useState(null);
	const [artistsList, setArtistsLists] = useState(null);
	const [eventsList, setEventsLists] = useState(null);
	const [flip, setFlip] = useState(false);
	const [slide, setSlide] = useState(false);
	const [showConcertDetails, setShowConcertDetails] = useState(null);
	
	function findConcerts() {
		getEventsByArtists(artistsList, eventsList, setEventsLists);
	}
	
	//TODO: create modal that opens for friends invite -- users can select/de-select certain friends too
	function openModal() {
		console.log("I also do nothing at the moment!");
	}

	useEffect(() => {
		checkAccessToken();
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

	const handleRotate = () => {
		setFlip(!flip);
		setSlide(!slide);
	};

	const handleEventClick = (eventId) => {
		if (showConcertDetails === eventId) {
			setShowConcertDetails(null);
			return;
		} else {
			setShowConcertDetails(eventId);
			return;
		}
	};

	return (
		<article className="playlist">
			<section className="playlist__overview">
				{playlist ? (
					<>
						<Link className="playlist__url" to={playlist.uri}>
							<h1 className="playlist__text">{playlist.name}</h1>
							<article
								className={`playlist__hover-block ${
									flip ? "playlist__hover-block--open" : ""
								}`}
							>
								{/* front */}
								<img
									className={`playlist__cover ${
										slide ? "playlist__cover--slide" : ""
									}`}
									src={playlist.images[0].url}
								/>

								{artistsList ? (
									<>
										{/* backside */}
										<section
											className={`playlist__top-artists ${
												slide ? "playlist__top-artists--slide" : ""
											}`}
										>
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
										</section>
									</>
								) : (
									""
								)}
							</article>

							<p className="playlist__text playlist__text--details">
								Total tracks: {playlist.tracks.total}
							</p>
						</Link>
					</>
				) : (
					""
				)}
			</section>
			<svg
				onClick={handleRotate}
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
			>
				<path d="m360-160-56-56 70-72q-128-17-211-70T80-480q0-83 115.5-141.5T480-680q169 0 284.5 58.5T880-480q0 62-66.5 111T640-296v-82q77-20 118.5-49.5T800-480q0-32-85.5-76T480-600q-149 0-234.5 44T160-480q0 24 51 57.5T356-372l-52-52 56-56 160 160-160 160Z" />
			</svg>
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
								<>
									<li
										key={event.id}
										className="concert"
										onClick={() => handleEventClick(event.id)}
									>
										<div className="concert__main">
											<div className="concert__image-div">
												<img className="concert__image" src={event.images} />
											</div>
											<h4 className="concert__name">{event.name}</h4>
										</div>
										{showConcertDetails === event.id ? (
											<article className="concert__popup">
												<section className="concert__info">
													<div className="concert__text-div">
														<h4 className="concert__text concert__text--bold">
															Date{" "}
														</h4>
														<p className="concert__text">
															{new Date(
																event.dates.start.localDate
															).toLocaleDateString("en-US", {
																weekday: "long",
																year: "numeric",
																month: "long",
																day: "numeric",
															})}
														</p>
													</div>
													<div className="concert__text-div">
														<h4 className="concert__text concert__text--bold">
															Location{" "}
														</h4>
														<p className="concert__text">
															{event.venues.venues[0].city.name}
														</p>
													</div>
													<div className="concert__text-div">
														<h4 className="concert__text concert__text--bold">
															Venue{" "}
														</h4>
														<p className="concert__text">
															{event.venues.venues[0].name}
														</p>
													</div>
												</section>
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
											</article>
										) : (
											""
										)}
									</li>
								</>
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
