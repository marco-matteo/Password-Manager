import React, {useEffect, useState} from "react";
import "./editPassword.css";

function EditPassword(props) {
    const [password, setPassword] = useState("");
    const [origin, setOrigin] = useState("");
    const [originURL, setOriginURL] = useState("");
    const [passwordString, setPasswordString] = useState("");
    const [originString, setOriginString] = useState("");
    const [originURLString, setOriginURLString] = useState("");

    useEffect(() => {
        async function fetchPassword() {
            const origin_id = Number(props.whichPage.split("_")[0]);
            const user_get = await fetch("/auth/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${props.JWT}`,
                }
            })
            const user_get_json = await user_get.json();
            const user_id = user_get_json.userId;
            const password = await fetch(`/passwords/${Number(origin_id)}/${user_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.JWT}`,
                },
            });
            const origin = await fetch(`/origins/${Number(origin_id)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.JWT}`,
                },
            })
            const passwordJson = await password.json();
            const originJson = await origin.json();
            setPasswordString(passwordJson.password);
            setOriginString(originJson.origin_name);
            setOriginURLString(originJson.origin_url);
        }
        fetchPassword().then(r => {
            console.log("Password fetched");
        });
    }, [props.whichPage]);

    async function handleSubmit(e) {
        e.preventDefault();
        const origin_id = Number(props.whichPage.split("_")[0]);
        await fetch(`/origins/${origin_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.JWT}`,
            },
            body: JSON.stringify({
                origin_id: origin_id,
                origin_name: origin,
                origin_url: originURL
            })
        })
        const user_get = await fetch("/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${props.JWT}`,
            }
        })
        const user_get_json = await user_get.json();
        const user_id = user_get_json.userId;
        await fetch(`/passwords/${origin_id}/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.JWT}`,
            },
            body: JSON.stringify({
                origin_id: origin_id,
                user_id: 1,
                password: password
            })
        })
        props.whichPage_func("main");
    }


    return (
        <div className="editPassword">
            <h1>Edit Password</h1>
            <form name="editPasswordForm" id="editPasswordForm" onSubmit={handleSubmit}>
                <label htmlFor="origin">Origin: </label>
                <input type="text" id="origin" name="origin" required onChange={e => setOrigin(e.target.value)} placeholder={originString}/>
                <br />
                <label htmlFor="originURL">Origin URL: </label>
                <input type="text" id="originURL" name="originURL" required onChange={e => setOriginURL(e.target.value)} placeholder={originURLString} />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} placeholder={passwordString} />
                <br />
                <button type="submit">Edit</button>
            </form>
            <button className="editPasswordButton">Back</button>
        </div>
    )
}

export default EditPassword;