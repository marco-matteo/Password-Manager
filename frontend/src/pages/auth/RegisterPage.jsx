import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcryptjs';
import './RegisterPage.css';

function RegisterPage(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault()
        const key = uuidv4();
        const hashed = await hash(password, 10)
        await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: hashed,
                personal_key: key,
            })
        })
        props.func()
    }

    return (
        <div className="registerContainer">
            <h1>Register</h1>
            <form name="registerForm" id="registerForm" onSubmit={handleRegister}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" required onChange={e => setUsername(e.target.value)}/>
                <br/>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)}/> <br/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)}/> <br/>
                <button type="submit">Register</button>
            </form>
            <button className="registerButton" onClick={props.func}>Back</button>
        </div>
    )
}

export default RegisterPage;