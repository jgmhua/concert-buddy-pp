import "./LoginPage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import axios from 'axios'

//TODO: Change harded coded urls into .env variables

export default function LoginPage() {

    async function redirectLink(){
        const response = await axios.get('http://localhost:8080/login/url');
        window.location.href = response.data.url;
    } 

    return (
    <article className="login">
        <Button type="submit" text="Login" handleFunc={redirectLink} />
    </article>
    );
}