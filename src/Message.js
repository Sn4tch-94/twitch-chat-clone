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

	return (
		<div className="Message">
			{getLastMessageTimestamp()}
			<p className="message_text">{props.message.username} : {props.message.message}</p>
		</div>
	)
}
