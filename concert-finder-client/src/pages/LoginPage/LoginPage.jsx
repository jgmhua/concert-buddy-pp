import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const { VITE_BASE_URL, VITE_PORT, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_REDIRECT_URL } = import.meta.env;

export default function LoginPage() {
	const [userData, setUserData] = useState(null);

	//TODO: move helper function to utils and import? 
	const generateRandomString = (length = 16) => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	};
	
	let stateString = generateRandomString();

	const loginWithSpotify = () => {
		const scopes = "user-read-private user-read-email";
		const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${VITE_CLIENT_ID}&scope=${encodeURIComponent(
			scopes
		)}&redirect_uri=${encodeURIComponent(VITE_REDIRECT_URL)}&state=${stateString}`;
		window.location.href = spotifyAuthUrl;
	};

	return (
		<article className="login">
			<h1>Welcome to Concert Finder</h1>
			<h2>Login to find concerts for you and your friends</h2>
			<Button type="submit" text="Login" handleFunc={loginWithSpotify} />
			<h2>Or search concerts based on public playlists</h2>
			{/*TODO: INSERT FORM COMPONENT HERE */}
		</article>
	);
}
