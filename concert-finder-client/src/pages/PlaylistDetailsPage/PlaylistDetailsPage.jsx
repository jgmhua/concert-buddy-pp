import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkAccessToken } from "../../../utils/authAndTokens";
import {
	getSinglePlaylist,
	getPlaylistDetails,
	getBuddiesProfiles,
} from "../../../utils/userFunctions";
import { getEventsByArtists } from "../../../utils/eventsFunctions";
import PlaylistOverviewCard from "../../components/PlaylistOverviewCard/PlaylistOverviewCard";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import "./PlaylistDetailsPage.scss";
import FriendList from "../../components/FriendList/FriendList";
import ConcertCard from "../../components/ConcertCard/ConcertCard";

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
	const [showFriends, setShowFriends] = useState(false);

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
						{/* <div> */}
						<h1 className="playlist__title">{playlist.name}</h1>
						<div className="playlist__card">
							<Link className="playlist__url" to={playlist.uri}>
								<PlaylistOverviewCard
									playlist={playlist}
									artistsList={artistsList}
									flip={flip}
									slide={slide}
								/>
							</Link>
							<div className="playlist__action-btns">
								<Link to={playlist.uri}>
									<span className="material-symbols-outlined material-symbols-outlined--link">
										open_in_new
									</span>
								</Link>
								<span
									className="material-symbols-outlined material-symbols-outlined--group"
									onClick={() => setShowFriends(!showFriends)}
								>
									group
								</span>
								<span
									className="material-symbols-outlined material-symbols-outlined--last-page"
									onClick={handleRotate}
								>
									expand_circle_right
								</span>
							</div>
						</div>
						{/* </div> */}
					</>
				) : (
					""
				)}
				{/* <Icon
							icon="m360-160-56-56 70-72q-128-17-211-70T80-480q0-83 115.5-141.5T480-680q169 0 284.5 58.5T880-480q0 62-66.5 111T640-296v-82q77-20 118.5-49.5T800-480q0-32-85.5-76T480-600q-149 0-234.5 44T160-480q0 24 51 57.5T356-372l-52-52 56-56 160 160-160 160Z"
							handleFunc={handleRotate}
							fill="#be29578"
						/> */}
				{/* <span
						className="material-symbols-outlined material-symbols-outlined--last-page"
						onClick={handleRotate}
					>
						last_page
					</span> */}
				{/* <span
					className="material-symbols-outlined material-symbols-outlined--group"
					onClick={() => setShowFriends(!showFriends)}
				>
					group
				</span> */}
			</section>
			{friendsInfo && showFriends ? (
				<section className="friends">
					<FriendList
						friendsInfo={friendsInfo}
						setShowFriends={setShowFriends}
					/>
				</section>
			) : (
				""
			)}
			<section className="concerts">
				<div className="concerts__btn-div">
					<Button
						text="Find concerts suggestions!"
						handleFunc={() => {
							findConcerts();
						}}
					/>
				</div>
				{eventsList ? (
					<>
						<div className="concerts__suggestions">
							<h2 className="concerts__header">Suggested Concerts</h2>
							<ul className="concerts__list">
								{eventsList.map((event) => {
									return (
										<ConcertCard
											key={event.id}
											showConcertDetails={showConcertDetails}
											event={event}
											handleEventClick={handleEventClick}
										/>
									);
								})}
							</ul>
						</div>
					</>
				) : (
					""
				)}
			</section>
		</article>
	);
}

{
	/* <div className="concert__main">
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
									)} */
}
// </li>
