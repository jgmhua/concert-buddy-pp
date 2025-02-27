import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./ConcertCard.scss";
import { useState } from "react";

//FIXME: figure out what to do with events that don't have an external url
//TODO: work on openModal function

export default function ConcertCard({
	showConcertDetails,
	event,
	handleEventClick,
}) {
	const [showModal, setShowModal] = useState(false);

	function openModal() {
		setShowModal(true);
	}

	return (
		<li className="concert" onClick={() => handleEventClick(event.id)}>
			<div className="concert__main">
				<div className="concert__image-div">
					<img className="concert__image" src={event.images} />
				</div>
				<h4 className="concert__name">{event.name}</h4>
			</div>
			<span
				className={`concert hover-text ${
					showConcertDetails !== event.id ? "hover-text--hover" : ""
				}`}
			>
				See concert details
			</span>
			{showConcertDetails === event.id ? (
				<article className="concert__popup">
					<section className="concert__info">
						<div className="concert__text-div">
							<h4 className="concert__text concert__text--bold">Date </h4>
							<p className="concert__text">
								{new Date(event.dates.start.localDate).toLocaleDateString(
									"en-US",
									{
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</p>
						</div>
						<div className="concert__text-div">
							<h4 className="concert__text concert__text--bold">Location </h4>
							<p className="concert__text">
								{event.venues.venues[0].city.name}
							</p>
						</div>
						<div className="concert__text-div">
							<h4 className="concert__text concert__text--bold">Venue </h4>
							<p className="concert__text">{event.venues.venues[0].name}</p>
						</div>
					</section>
					<div className="concert__btns">
						<Link to={event.url ?? ""}>
							<span className="material-symbols-outlined concert-btn">
								open_in_new
							</span>
						</Link>
						<span
							className="material-symbols-outlined concert-btn"
							onClick={() => openModal()}
						>
							group_add
						</span>
					</div>
					{showModal === true ? (
						<section className="modal">
							{/* <div className="modal__overlay"> */}
								<div className="modal__content">
									<h3 className="modal__title">Invite Friends to Concert</h3>
									<div className="modal__message">
										{/* TODO: include some sort of image */}
										<h4>Concert Name</h4>
										<h4>Date</h4>
										<h4>Location</h4>
										<h4>Link</h4>
										<form className="invite">
										<label>
											Invite Friends
											{/* TODO: for now, since we don't have access to their emails through Spotify, users will have to manually type in each person's email -- think about solutions for future*/}
											<input></input>
										</label>
										</form>
									</div>
								</div>
							{/* </div> */}
						</section>
					) : (
						""
					)}
				</article>
			) : (
				""
			)}
		</li>
	);
}
