import './App.css';
import React, {useState, useEffect} from "react";
import Chat from "./Chat"

function App() {
	const [username, setUsername] = useState("Snatch")

	// useEffect(() => {
	// 	setUsername(prompt("Please enter your username"))
	// }, [])

	return (
		<div className="App">
			<img className="app_logo" alt="twitchLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/320px-Twitch_logo.svg.png"/>
			<Chat username={username}/>
		</div>
	);
}

export default App;