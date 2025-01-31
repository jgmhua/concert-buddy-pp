import axios from "axios";

const { VITE_BASE_URL, VITE_PORT } = import.meta.env;

//Note: refreshing token from spotify api does not provide expiry time
const handleAuthSuccess = (accessToken, refreshToken, expiresIn = 3600) => {
	// Expiry timestamp
	const expiryTime = Date.now() + expiresIn * 1000;
	localStorage.setItem("AccessToken", accessToken);
	localStorage.setItem("RefreshToken", refreshToken);
	localStorage.setItem("ExpiryTime", expiryTime);
	console.log("tokens exchanged!");
};

async function exchangeCodeForToken(code, state) {
	try {
		const response = await axios.post(
			`${VITE_BASE_URL}:${VITE_PORT}/callback`,
			{
				code: code,
				state: state,
			}
		);
		handleAuthSuccess(
			response.data.access_token,
			response.data.refresh_token,
			response.data.expires_in
		);
		return;
	} catch (error) {
		if (
			error.response.data.error === "invalid_grant" ||
			error.response.data.error_description === "Authorization code expired"
		) {
			getNewAccessToken();
		} else {
			console.error(
				"Failed to exchange code for token or a new access token is required",
				error
			);
		}
	}
}

async function getNewAccessToken() {
	const access_token = localStorage.getItem("AccessToken");
	const refresh_token = localStorage.getItem("RefreshToken");

	try {
		const response = await axios.get(
			`${VITE_BASE_URL}:${VITE_PORT}/refresh?refresh_token=${refresh_token}`,
			{
				headers: {
					Authorization: "Bearer" + `${refresh_token}`,
				},
			}
		);
		handleAuthSuccess(response.data.access_token, response.data.refresh_token);
		console.log("tokens exchanged!");
		return;
	} catch (error) {
		console.error(
			"fail to get new token using refresh token:",
			error.response?.data || error.message
		);
	}

	return;
}

//FIXME: are code and state needed when we do the refresh?
async function checkAccessToken(code, state) {
	const access_token = localStorage.getItem("AccessToken");
	const expiry_time = localStorage.getItem("ExpiryTime");

	if (!access_token || Date.now() > expiry_time) {
		console.log("Access token expired. Refreshing...");
		try {
			await getNewAccessToken();
		} catch (error) {
			console.error("issue refreshing token");
		}
	} else {
		console.log("tokens are still valid!");
	}
	return;
}

export { exchangeCodeForToken, getNewAccessToken, checkAccessToken };
