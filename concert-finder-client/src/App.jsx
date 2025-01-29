import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CallbackPage from "./pages/CallbackPage/CallbackPage";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

export default function App() {
	
	return (
		<BrowserRouter>
			<article className="app">
				<Header />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/callback" element={<CallbackPage />} />
					<Route path="/notfound" element={<NotFoundPage />} />
					<Route path="*" element={<Navigate to="/notfound" />} />
				</Routes>
				<Footer />
			</article>
		</BrowserRouter>
	);
}
