import React from 'react'
import { connect } from 'react-redux'

const UserList = (props) => {
	return (
		<>
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
								<td>{user.name}</td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<br />
		</>
	)
}

const mapStateToProps = (state) => {
	return { users: state.users }
}

export default connect(mapStateToProps, null)(UserList)