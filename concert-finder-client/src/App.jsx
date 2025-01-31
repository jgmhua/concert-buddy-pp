import "./App.scss";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CallbackPage from "./pages/CallbackPage/CallbackPage";
import PlaylistDetailsPage from "./pages/PlaylistDetailsPage/PlaylistDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
	return (
		<BrowserRouter>
			<article className="app">
				<div className="app__header-container">
					<Header />
				</div>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/callback" element={<CallbackPage />} />
					<Route
						path="/playlists/:playlistId"
						element={<PlaylistDetailsPage />}
					/>
					<Route path="/notfound" element={<NotFoundPage />} />
					<Route path="*" element={<Navigate to="/notfound" />} />
				</Routes>
				<div className="app__footer-container">
					<Footer />
				</div>
			</article>
		</BrowserRouter>
	);
}
