import "./Header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header className="header">
			<nav className="nav-bar">
				<NavLink to="/"> Home </NavLink>
			</nav>
			<section className="user-info">
				<div className="user-info__pic">User pic?</div>
				<p className="user-info__name">User Info?</p>
			</section>
		</header>
	);
}
