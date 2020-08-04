import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/loginReducer'
import { Link, useHistory } from 'react-router-dom'

const Menu = (props) => {
	const history = useHistory()

	const handleLogout = () => {
		props.clearUser()
		history.push("/")
	}

	return (
		<div style={{ background: 'lightgray' }}>
			<Link to="/blogs">Blogs</Link>
			<Link to="/users">Users</Link>
			{`${props.user.name} has logged in.`}
			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return { user: state.user }
}

const mapDispatchToProps = { clearUser }

export default connect(mapStateToProps, mapDispatchToProps)(Menu)