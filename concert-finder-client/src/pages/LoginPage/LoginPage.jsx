import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import axios from 'axios'

//TODO: Change harded coded urls into .env variables

export default function LoginPage() {

    async function redirectLink(){
        const response = await axios.get('http://localhost:8080/login/url');
        window.location.href = response.data.url;
    } 

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
