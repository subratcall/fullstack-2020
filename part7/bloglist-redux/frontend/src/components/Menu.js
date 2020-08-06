import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { MenuDiv, StyledLink } from '../styles/styles'

const Menu = (props) => {
	const history = useHistory()

	const handleLogout = () => {
		props.clearUser()
		history.push("/")
	}

	return (
		<MenuDiv style={{ background: 'lightgray' }}>
			<StyledLink to="/blogs">Blogs</StyledLink>
			<StyledLink to="/users">Users</StyledLink>
			<em>{` ${props.user.name} has logged in `}</em>
			<button onClick={handleLogout}>Logout</button>
		</MenuDiv>
	)
}

const mapStateToProps = (state) => {
	return { user: state.user }
}

const mapDispatchToProps = { clearUser }

export default connect(mapStateToProps, mapDispatchToProps)(Menu)