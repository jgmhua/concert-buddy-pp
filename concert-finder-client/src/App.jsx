import "./App.scss";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
	return (
		<BrowserRouter>
			<article className="app">
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/notfound" element={<NotFoundPage />} />
					<Route path="*" element={<Navigate to="/notfound" />} />
				</Routes>
				<Footer />
			</article>
		</BrowserRouter>
	);
}
