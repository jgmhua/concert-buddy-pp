import { Link } from "react-router-dom";
import "./PlaylistCard.scss";

export default function PlaylistCard({ id, name, image, tracksTotal }) {
	return (
		<li className="playlists" key={id}>
			<Link className="playlists__item" to={`/playlists/${id}`}>
				<div className="playlists__cover-div">
					<img className="playlists__cover" src={image} />
				</div>
				<div className="playlists__info-div">
					<h3 className="playlists__title">{name}</h3>
					<p className="playlists__tracks">Total tracks: {tracksTotal}</p>
				</div>
			</Link>
		</li>
	);
}
