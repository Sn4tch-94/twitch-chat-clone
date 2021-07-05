import "./Message.css";
import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import { db } from "./firebase"
var moment = require('moment');


const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}))

export default function Message(props) {
	const [style, setStyle] = useState({cursor: 'cursor'})
	const [open, setOpen] = useState(false)
	const [input, setInput] = useState(props.message.message)
	const classes = useStyles(props);

	const getLastMessageTimestamp = () => {
		if (props.message.timestamp) {
			const messageTimestamp = props.message.timestamp
			return (
				<p className="message_timestamp">{moment(messageTimestamp.seconds * 1000).fromNow()}</p>	
			)
		}
	}

	const getColor = () => {
		let sumChars = 0
		for (let i = 0; i < props.message.username.length; i++) {
			sumChars += props.message.username.charCodeAt(i)
		}
		return (props.colors[sumChars % props.colors.length])
	}

	const updateMessage = () => {
		db.collection('messages').doc(props.id).set({
			message: input,
		}, { merge: true })
		setOpen(false)
	}

	const deleteMessage = () => {
		db.collection('messages').doc(props.id).delete()
		setOpen(false)
	}

	return (
		<div className="Message">
			{getLastMessageTimestamp()}
			<Modal className="message_modal" open={open} onClose={() => setOpen(false)}>
				<div className={classes.paper}>
					<h1>Edit message</h1>
					<TextField className="message_ModalTextField" label="Message" fullWidth multiline rows={1} variant="filled" value={input} onChange={e => setInput(e.target.value)}/>
					<Button onClick={updateMessage}>Update</Button>
					<Button onClick={deleteMessage}>Delete</Button>
				</div>
			</Modal>
			<div className="message_container" style={style} onClick={() => setOpen(true)}
				onMouseEnter={() => {
					if(props.message.username === props.username) {
						setStyle({cursor: 'pointer'})
					}}}
				onMouseLeave={() => {
					if(props.message.username === props.username) {
						setStyle({display : 'cursor'})
					}}}
			>
				<p className="message_text" style={{color:getColor()}}>{props.message.username}</p>
				<p className="message_text" > : {props.message.message}</p>
			</div>
		</div>
	)
}
