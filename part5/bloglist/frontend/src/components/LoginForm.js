import React from 'react'

const Login = ({ username, password, handleSubmit, handleChange }) => (
	<form onSubmit={handleSubmit}>
		<h2>Please login</h2>
		<div>
			Username:
			<input type="text" name="Username" value={username} onChange={handleChange}></input>
		</div>
		<div>
			Password:
			<input type="text" name="Password" value={password} onChange={handleChange}></input>
		</div>
		<button type="submit">Login</button>
	</form>
)

export default Login