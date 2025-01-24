import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function CallbackPage() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        console.log(code, state)

        if (code) {
            exchangeCodeForToken(code);
        }
    }, [searchParams]);

    async function exchangeCodeForToken(code) {
        try {
            const response = await axios.post("http://localhost:8080/callback", { code });
            console.log("Access token:", response.data.access_token);
            // Store the token (e.g., in localStorage or React state)
        } catch (error) {
            console.error("Failed to exchange code for token:", error);
        }
    }

    return <div>Authenticating...</div>;
}
