import "./Header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header className="header">
			<nav className="nav-bar">
				<NavLink to="/"> Home </NavLink>
			</nav>
			<section className="header__user-section">
				<div className="header__user">User pic?</div>
				<p className="header__email">User Info?</p>
			</section>
		</header>
	);
}
