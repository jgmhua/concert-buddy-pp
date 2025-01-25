import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function CallbackPage() {
    const [profileData, setProfileData] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        console.log("code", code);
        console.log("state", state);

        if (code) {
            exchangeCodeForToken(code);
        }
    }, []);

    async function exchangeCodeForToken(code, state) {
        // if (localStorage)
        try {
            const response = await axios.post("http://localhost:8080/callback", { code, state });
            console.log("Access token:", response.data.access_token);
            localStorage.setItem('AccessToken', response.data.access_token);
        } catch (error) {
            console.error("Failed to exchange code for token:", error);
        }
    }

    async function getUserProfile() {
        const access_token = localStorage.getItem("AccessToken");

        if (!access_token) {
            console.error("Access token not found");
            return;
        }
        console.log('check access token before post req', access_token)
        try {
            const response = await axios.get('http://localhost:8080/user/profile', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                });
            console.log(response.data);
            setProfileData(response.data);
        return profileData;
        } catch (error) {
            console.error("fail to get profile",  error.response?.data || error.message);
        }
        
    }

    // if (profileData === null) {
    //     return(<div>Authenticating...</div>);
    // }

    return (
        <>
        
        <button onClick={getUserProfile}>Click me!</button>

        {profileData? <p>{profileData.display_name}</p>: "" }
        
        </>
        )
}
