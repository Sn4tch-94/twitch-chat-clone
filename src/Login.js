import React, { useState } from 'react'
import { auth } from "./firebase"
import { Button, FormControl, TextField, Grid } from "@material-ui/core"

export default function Login(props) {
	const [input, setInput] = useState("")

	function handleAnonymousLogin(e) {
		auth.signInAnonymously()
		props.onChange(input)
	}

	return (
		<div>
			<p>Bienvenue ! Veuillez vous connecter</p>
			<form className="chat_form">
				<FormControl className="chat_formControl" fullWidth>
					<Grid className="chat_grid">
						<TextField className="chat_textField" label="Choisissez un pseudo" fullWidth multiline rows={1} variant="filled" value={input} onChange={e => setInput(e.target.value)}/>
					</Grid>
					<Grid className="chat_grid">	
						<Button className="chat_button" variant="contained" color="primary" onClick={handleAnonymousLogin}>Connexion</Button>
					</Grid>
				</FormControl>
			</form>
		</div>
	)
}