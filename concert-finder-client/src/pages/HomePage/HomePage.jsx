import "./HomePage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx";

// TODO: come back to this and fix/implement actual functionality

export default function HomePage() {
	const [playlist, setPlaylist] = useState("");
	// const [userData, setUserData] = useState(null); //we might have to adjust to be an object with the key/value pairs we're expecting

	// async function getUserData() {
	// 	const response = await axios.get(`${VITE_BASE_URL}:${VITE_PORT}/login`);

	// 	if(response.data) {
	// 		setUserData(response.data);
	// 	}
	// }

	// if(!userData) {
		
	// }

	const handleFunc = () => {
		console.log("placeholder onClick function");
	};

	const handleForm = (e) => {
		e.preventDefault();
		console.log("placeholder for form submit");
	};

	return (
		<article className="home">
			<h1 className="home__title">Home Page</h1>
			<section className="home__content">
				<form className="form" onSubmit={handleForm}>
					<label className="form__label" htmlFor="playlist">
						<input
							className="form__input"
							onChange={() => {
								setPlaylist("");
							}}
							value={playlist}
							name="playlist"
							type="text"
							placeholder="Enter the name of a shared playlist."
						/>
					</label>
					<Button type="submit" text="Find Concerts" handleFunc={handleForm} />
				</form>
			</section>
		</article>
	);
}
