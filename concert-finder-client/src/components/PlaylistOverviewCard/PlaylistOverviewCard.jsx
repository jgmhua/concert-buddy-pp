import { Link } from "react-router-dom";
import "./PlaylistOverviewCard.scss";

//TODO: maybe include external link to each artist?

//FIXME: weird thing... is it just me or is the back side of the card just slightly taller than the front?

export default function PlaylistOverviewCard({
	playlist,
	artistsList,
	flip,
	slide,
}) {
	return (
		<div className={`overview-card ${flip ? "overview-card--flip" : ""}`}>
			<img
				className={`overview-card__front ${
					slide ? "overview-card__front--slide" : ""
				}`}
				src={playlist.images[0].url}
			/>
			{artistsList ? (
				<section
					className={`overview-card__back ${
						slide ? "overview-card__back--slide" : ""
					}`}
				>
					<div className="overview-card__top-artists">
						<h3 className="overview-card__title">Top Artists in Playlist</h3>
						<ul>
							{artistsList.map((artist) => {
								return (
									<li>
										<p className="overview-card__text">{artist}</p>
									</li>
								);
							})}
						</ul>
					</div>
					<h4 className="overview-card__text overview-card__text--details">
						Total tracks: {playlist.tracks.total}
					</h4>
				</section>
			) : (
				""
			)}
		</div>
	);
}
