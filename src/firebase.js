import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyDyOnN1xejeEuXj3xavKWUmatq6wyxk_Fw",
	authDomain: "twitch-tchat-clone.firebaseapp.com",
	projectId: "twitch-tchat-clone",
	storageBucket: "twitch-tchat-clone.appspot.com",
	messagingSenderId: "193484273020",
	appId: "1:193484273020:web:6752f080c9d211cf3f60f9",
	measurementId: "G-NW9DDYRYG8"
})

const db = firebase.firestore()

export default db