import "./Message.css";
import React from "react";
var moment = require('moment');

export default function Message(props) {
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

	return (
		<div className="Message">
			{getLastMessageTimestamp()}
			<div className="message_container">
				<p className="message_text" style={{color:getColor()}}>{props.message.username}</p>
				<p className="message_text" > : {props.message.message}</p>
			</div>
		</div>
	)
}
