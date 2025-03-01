import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "./ConcertCard.scss";
import InviteForm from "../InviteForm/InviteForm";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

//FIXME: figure out what to do with events that don't have an external url
//TODO: work on openModal function
/* TODO: for now, since we don't have access to their emails through Spotify, users will have to manually type in each person's email -- think about solutions for future*/

export default function ConcertCard({
	showConcertDetails,
	event,
	handleEventClick,
}) {
	const [showModal, setShowModal] = useState(false);
	const [allEmails, setAllEmails] = useState([]);
	const [emailList, setEmailList] = useState("");

	const handleFriendInvites = async (event, allEmails) => {
		event.preventDefault();
		console.log("emailList:", emailList);
		setAllEmails(emailList.split(","));

		//2025-02-28
		//TODO: come back to this and continue
		//TODO: pick an integration option for sending emails https://react.email/docs/introduction and then set up emailing functionality
		// try {
		// 	const response = await axios.post(
		// 		`${VITE_BASE_URL}:${VITE_PORT}/invite`,
		// } catch (error) {
		// }
	};

	return (
		<li className="concert">
			<div className="concert__main">
				<div className="concert__left">
					<div className="concert__image-div">
						<img className="concert__image" src={event.images} />
					</div>
					<h4 className="concert__name">{event.name}</h4>
				</div>
				<span
					onClick={() => handleEventClick(event.id)}
					className="material-symbols-outlined material-symbols-outlined--circle-down"
				>
					expand_circle_down
				</span>
			</div>
			{/* <span
				className={`concert hover-text ${
					showConcertDetails !== event.id ? "hover-text--hover" : ""
				}`}
			>
				See concert details
			</span> */}
			{showConcertDetails === event.id && (
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
							onClick={() => setShowModal(true)}
						>
							group_add
						</span>
						{showModal && (
							<Modal
								setShowModal={setShowModal}
								modalContent={event}
								title="Invite Friends to Concert"
							>
								{/*TODO: TURN CONCERT INFO INTO COMPONENT... WAS ALSO USED IN CONCERT CARD! */}
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
								<InviteForm
									handleFriendInvites={handleFriendInvites}
									allEmails={allEmails}
									setEmailList={setEmailList}
								/>
							</Modal>
						)}
					</div>
				</article>
			)}
		</li>
	);
}

/* <form className="invite__form" onSubmit={handleFriendInvites}>
	<h3>Select Friends</h3>
	<label className="invite__label">
		Enter emails
		<small className="message message--small">
			Enter emails separated by comma.
		</small>
		<input
			className="invite__input"
			name="emails"
			type="email"
			multiple
			placeholder="Ex: friend1@email.com,friend2@email.com"
			onChange={(e) => {
				stateVariable(e.target.value);
			}}
		/>
	</label>
	<div>
		<h4>You're sending invites to the following friends</h4>
		{allEmails &&
			allEmails.map((email) => {
				return <p key={email}>{email}</p>;
			})}
	</div>
	<button type="submit" className="invite__submit">
		Submit
	</button>
</form> */

// <section className="modal">
// 	<div className="modal__content">
// 		<span
// 			className="material-symbols-outlined modal__close"
// 			onClick={() => setShowModal(false)}
// 		>
// 			close
// 		</span>
// 		<h3 className="modal__title">Invite Friends to Concert</h3>
// 		<div className="modal__content">
// 			{/* TODO: include some sort of image */}
// 			<div className="modal__concert-details">
// 				<h4>Concert Name</h4>
// 				<h4>Date</h4>
// 				<h4>Location</h4>
// 				<h4>Link</h4>
// 			</div>
// 			<form
// 				className="invite__form"
// 				onSubmit={handleFriendInvites}
// 			>
// 				<label className="invite__label">
// 					Invite Friends
// 					<small className="message message--small">
// 						Enter emails separated by comma.
// 					</small>
// 					<input
// 						className="invite__input"
// 						name="emails"
// 						type="email"
// 						multiple
// 						placeholder="Ex: friend1@email.com,friend2@email.com"
// 						onChange={(e) => {
// 							setEmailList(e.target.value);
// 						}}
// 					/>
// 				</label>
// 				<div>
// 					<h4>You're sending invites to the following friends</h4>
// 					{allEmails &&
// 						allEmails.map((email) => {
// 							return <p key={email}>{email}</p>;
// 						})}
// 				</div>
// 				<button type="submit" className="invite__submit">
// 					Submit
// 				</button>
// 			</form>
// 		</div>
// 	</div>
// </section>
