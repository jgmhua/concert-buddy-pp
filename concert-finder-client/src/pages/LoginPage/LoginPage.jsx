import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

export default function LoginPage() {
	const [userData, setUserData] = useState(null);
	//we might have to adjust to be an object with the key/value pairs we're expecting
	const navigate = useNavigate();

	async function redirectLink() {
        try {
            const response = await axios.get(`${VITE_BASE_URL}:${VITE_PORT}/login`);
            setUserData(response.data);
            console.log(response.data, "user profile?");
        } catch (error) {
            console.error(error,"Unsuccessful in retrieving user data.")
        }
		// navigate(`${VITE_BASE_URL}:${VITE_PORT}/login`, { replace: true });
	}

	return (
		<article className="login">
			<h1>Welcome to Concert Finder</h1>
			<h2>Login to find concerts for you and your friends</h2>
			<Button type="submit" text="Login" handleFunc={redirectLink} />
			<h2>Or search concerts based on public playlists</h2>
			{/* INSERT FORM COMPONENT HERE */}
		</article>
	);
}
