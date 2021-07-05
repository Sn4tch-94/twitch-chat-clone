import React from 'react'
import Chat from "./Chat"

export default function Home(props) {
	return (
		<div>
			<Chat username={props.username}/> 
		</div>
	)
}