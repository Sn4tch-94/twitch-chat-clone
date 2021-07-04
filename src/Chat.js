import './Chat.css'
import React, {useState, useEffect, useRef} from "react";
import db from "./firebase"
import firebase from "firebase"
import { Button, FormControl, TextField, Grid } from "@material-ui/core"
import Message from './Message'


export default function Chat(props) {
	const [input, setInput] = useState("")
	const [messages, setMessages] = useState([])

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

	return (
		<div className="Chat">
			<div className="chat_messages">
				{
					messages.map(({id, message}) => (
						<Message key={id} message={message} username={props.username}/>
					))
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