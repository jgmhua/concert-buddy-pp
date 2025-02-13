import "./LoginPage.scss";
import Button from "../../components/Button/Button.jsx";
import axios from "axios";

//TODO: Change harded coded urls into .env variables
const { VITE_PORT, VITE_BASE_URL } = import.meta.env;

export default function LoginPage() {
	async function redirectLink() {
		const response = await axios.get(`${VITE_BASE_URL}:${VITE_PORT}/login/url`);
		window.location.href = response.data.url;
	}

	return (
		<article className="login">
			<section className="login__blurb">
				<h1 className="login__header">Concert Buddy</h1>
				<h2 className="login__subheader">A social app for concert goers</h2>
			</section>
			<Button type="submit" text="Login" handleFunc={redirectLink} />
		</article>
	);
}
