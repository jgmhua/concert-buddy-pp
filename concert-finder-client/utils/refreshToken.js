import axios from "axios";

export default async function getNewAccessToken() {
	const access_token = localStorage.getItem("AccessToken");
	const refresh_token = localStorage.getItem("RefreshToken");
	console.log("access token and refresh token:", access_token, refresh_token);

	try {
		const response = await axios.get(
			`http://localhost:8080/refresh?refresh_token=${refresh_token}`,
			{
				headers: {
					Authorization: "Bearer" + `${refresh_token}`,
				},
			}
		);

		console.log("response data from refresh fetch:", response.data);

		localStorage.setItem("AccessToken", response.data.access_token);
		localStorage.setItem("RefreshToken", response.data.refresh_token);
		localStorage.setItem("ExpiryTime", 3600);
	} catch (error) {
		console.error(
			"fail to get new token using refresh token:",
			error.response?.data || error.message
		);
	}
}

// export { checkAccessToken };

// async function checkAccessToken(code,state,) {
// 	const access_token = localStorage.getItem("AccessToken");
// 	const refresh_token = localStorage.getItem("RefreshToken");
// 	try {
// 		const response = await axios.post("http://localhost:8080/callback", {
// 			code,
// 			state,
// 		});
// 		console.log("Access token:", response.data.access_token);
// 		if (response.data){
//			setIsTokenExpired(false);
// 		}
// 	} catch (error) {
// 		console.error("Failed to exchange code for token:", error);
// 		setIsTokenExpired(true);
// 	}
// }
