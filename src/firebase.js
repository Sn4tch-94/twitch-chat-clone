import firebase from "firebase/app"
require('firebase/firestore')
require('firebase/auth')


const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyDyOnN1xejeEuXj3xavKWUmatq6wyxk_Fw",
	authDomain: "twitch-tchat-clone.firebaseapp.com",
	projectId: "twitch-tchat-clone",
	storageBucket: "twitch-tchat-clone.appspot.com",
	messagingSenderId: "193484273020",
	appId: "1:193484273020:web:6752f080c9d211cf3f60f9",
	measurementId: "G-NW9DDYRYG8"
})

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore()

export const auth = firebase.auth()