import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleSubmit, handleChange }) => (
	<form onSubmit={handleSubmit}>
		<h2>Please login</h2>
		<div>
			Username:
			<input id="user" type="text" name="Username"
				value={username} onChange={handleChange}></input>
		</div>
		<div>
			Password:
			<input id="pass" type="text" name="Password"
				value={password} onChange={handleChange}></input>
		</div>
		<button type="submit">Login</button>
	</form>
)

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired
}

export default LoginForm