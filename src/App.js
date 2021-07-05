import './App.css';
import React, { useState } from "react"
import Home from "./Home"
import Login from "./Login"

export default function App() {
	const [username, setUsername] = useState("")

	function handleLogin(newValue) {
		setUsername(newValue)
	}

	return (
		<div className="App">
			<img className="app_logo" alt="twitchLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/320px-Twitch_logo.svg.png"/>
			{username ?
				<Home username={username}/>
			:
				<Login onChange={handleLogin}/>
			}
		</div>
	)
}