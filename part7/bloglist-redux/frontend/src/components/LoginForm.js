import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'

import { login, setUser, clearUser } from '../reducers/loginReducer'
import { setNotif } from '../reducers/notificationReducer'
import { Title, Button } from '../styles/styles'

const LoginForm = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()
		props.login(username, password)
			.then(() => {
				props.setNotif("Successfully logged in", false, 5)
			})
			.catch(() => props.setNotif("Failed to log in: invalid credentials", true, 5))
		setUsername('')
		setPassword('')
	}

	const textChange = event => {
		switch (event.target.name) {
			case "Username":
				setUsername(event.target.value)
				break
			case "Password":
				setPassword(event.target.value)
				break
			default:
				break
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<Title>Please Login</Title>
			<div>
				<input id="user" type="text" name="Username" 
					placeholder="Username" value={username} 
					onChange={textChange}></input>
			</div>
			<div>
			<input id="user" type="text" name="Password" 
					placeholder="Password" value={password} 
					onChange={textChange}></input>
			</div>
			<Button type="submit">Login</Button>
		</form>
	)

}

const mapStateToProps = (state) => {
	return { user: state.user }
}

const mapDispatchToProps = { login, setUser, clearUser, setNotif }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)