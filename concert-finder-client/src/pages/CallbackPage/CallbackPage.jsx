import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function CallbackPage() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        console.log("code", code);
        console.log("state", state);

        if (code && state) {
            exchangeCodeForToken(code, state);
        }
    }, []);

    async function exchangeCodeForToken(code, state) {
        try {
            const response = await axios.post("http://localhost:8080/callback", { code, state });
            console.log("Access token:", response.data.access_token);
        } catch (error) {
            console.error("Failed to exchange code for token:", error);
        }
    }

    return <div>Authenticating...</div>;
}
