import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
	return (
		<article className="not-found">
			<h1>Sorry, you're lost!</h1>
			<p>Please navigate back to:</p>
			<Link to="/">
				<Button text="Home" />
			</Link>
		</article>
	);
}
