import React from 'react'
import {
	useRouteMatch,
	Switch,
	Route,
	Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import User from './User'

const UserList = (props) => {
	const match = useRouteMatch('/:userId')
	const user = match
		? props.users.find(user => user.id === match.params.userId)
		: null

	return (

		<Switch>
			<Route path="/:userId">
				<User user={user} />
			</Route>
			<Route path="/">
				<h2>Users</h2>
				<table>
					<thead>

						<tr>
							<th></th>
							<th># of Blogs</th>
						</tr>
					</thead>

					<tbody>
						{props.users.map(user => {
							return (
								<tr key={user.id}>
									<td>
										<Link to={`/${user.id}`}>{user.name}</Link>
									</td>
									<td>{user.blogs.length}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<br />
			</Route>
		</Switch>

	)
}

const mapStateToProps = (state) => {
	return { users: state.users }
}

export default connect(mapStateToProps, null)(UserList)