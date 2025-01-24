import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import loggedRoutes from "./routes/loggedRoutes.js";

const app = express();
const { CORS_ORIGIN, BASE_URL, REDIRECT_URL } = process.env;
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public"));

//TODO: implement middleware to redirect successful spotify auth back to frontend with user data and tokens
const authenticateSpotify = (req, res, next) => {
	const accessToken = "YOUR_ACCESS_TOKEN"; //unsure what to assign!
	if (!accessToken) {
		return res.status(401).send("Not authenticated");
	}
	next();
};

// app.use("/login", authRoutes);
// app.use("/callback", loggedRoutes);
app.use("/callback", authRoutes);
app.use("/login", loggedRoutes);

app.get("/", (_req, res) => {
	res.send("hello");
});

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});
