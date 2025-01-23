import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
	

	return (
		<BrowserRouter>
			<article className="app">
				<Header />
				<Routes>
					{/* <Route path="/" element={<HomePage />} /> */}
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/notfound" element={<NotFoundPage />} />
					<Route path="*" element={<Navigate to="/notfound" />} />
				</Routes>
				<Footer />
			</article>
		</BrowserRouter>
	);
}
