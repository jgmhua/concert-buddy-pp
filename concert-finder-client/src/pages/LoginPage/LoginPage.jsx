import "./LoginPage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx";

export default function LoginPage() {

    function redirectLink(){
        
    } 

    return (
    <article className="login">
        <Button type="submit" text="Login" handleFunc={redirectLink} />
    </article>
    );
}