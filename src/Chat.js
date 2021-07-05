import './Chat.css'
import React, {useState, useEffect, useRef} from "react";
import firebase from 'firebase/app'
import { db } from "./firebase"
import { Button, FormControl, TextField, Grid } from "@material-ui/core"
import Message from './Message'


export default function Chat(props) {
	const [input, setInput] = useState("")
	const [messages, setMessages] = useState([])
	const [randomColors, setRandomColors] = useState([])

	const AlwaysScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	useEffect(() => {
		db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
			if (snapshot.size) {
				setMessages(snapshot.docs.map(doc => ({
					id: doc.id,
					message: doc.data()
				})))
			}
		})
		generateRandomColors()
	}, [])

	const sendMessage = (e) => {
		e.preventDefault()
		db.collection('messages').add({
			message: input,
			username: props.username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		setInput('')
	}

	function generateRandomColors() {
		for (let i = 0; i < 10; i++) {
			let randColor = "#" + ((1<<24)*Math.random() | 0).toString(16)
			randomColors.push(randColor)
		}
		console.log(randomColors)
	}

	return (
		<div className="Chat">
			<div className="chat_messages">
				{
					randomColors ?
					messages.map(({id, message}) => (
						<Message key={id} message={message} colors={randomColors}/>
					)) : null
				}
				<AlwaysScrollToBottom/>
			</div>
			<form className="chat_form">
				<FormControl className="chat_formControl" fullWidth>
					<Grid className="chat_grid">
						<TextField className="chat_textField" label="Envoyer un message" fullWidth multiline rows={1} variant="filled" value={input} onChange={e => setInput(e.target.value)}/>
					</Grid>
					<Grid className="chat_grid">	
						<Button className="chat_button" variant="contained" color="primary" onClick={sendMessage}>Chat</Button>
					</Grid>
				</FormControl>
			</form>
		</div>
	)
}