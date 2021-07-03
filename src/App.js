import './App.css';
import React, {useState, useEffect} from "react";
import db from "./firebase"
import firebase from "firebase"
import { Button, FormControl, Input, InputLabel, IconButton } from "@material-ui/core"
import SendIcon from '@material-ui/icons/Send';
import Message from './Message'

function App() {
	const [input, setInput] = useState("")
	const [username, setUsername] = useState("")
	const [messages, setMessages] = useState([])

	useEffect(() => {
		setUsername(prompt("Please enter your username"))
	}, [])

	useEffect(() => {
		db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			setMessages(snapshot.docs.map(doc => ({
				id: doc.id,
				message: doc.data()
			})))
		})
	}, [])

	const sendMessage = (e) => {
		e.preventDefault()
		db.collection('messages').add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		setInput('')
	}

	return (
		<div className="App">
			<img alt="twitchLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/455px-Twitch_logo.svg.png"/>
			<h1>Twitch chat clone</h1>
			<h2>Welcome {username}</h2>

			{
				messages.map(({id, message}) => (
					<Message key={id} message={message} username={username}/>
				))
			}

			<form className="app_form">
				<FormControl className="app_formControl">
					<Input className="app_input" placeholder="Enter a message..." value={input} onChange={(e) => setInput(e.target.value)}></Input>
					<IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
						<SendIcon/>
					</IconButton>
				</FormControl>
			</form>
		</div>
	);
}

export default App;