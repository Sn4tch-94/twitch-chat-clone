import "./Message.css";
import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function Message(props) {
	return (
		<div className="Message">
			<Card className="message_card">
				<CardContent classname="message_cardContent">
					<Typography>
						{props.message.username} : {props.message.message}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}
