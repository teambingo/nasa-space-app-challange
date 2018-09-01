import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'

const messaging = firebase.messaging()
try {
	messaging.requestPermission()
	.then(function () {
		console.log('yay permission granted')
		return messaging.getToken()
	})
	.then(function (token) {
        console.log(token)
		if (localStorage.getItem('token') !== token) {
			console.log('new token ')
			localStorage.setItem('token', token)
			console.log(token)
		}	else	{
			console.log('same token')
			console.log(token)
			localStorage.setItem('token', token)
		}
	})

	.catch(function (err) {
		console.log('err',err)
	})
	messaging.onMessage(function (payload) {
		// this gets invoked when user is on page and the database is updated
	console.log('onMessage', payload)
})

} catch(err) {
console.log(err)
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
