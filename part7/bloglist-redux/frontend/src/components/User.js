import React from 'react'

const User = ({ user }) => {
	if (user) {
		return (
			<>
				<h2>{user.name}</h2>
				<h4>Added Blogs</h4>
				<ul>
					{
						user.blogs.map(blog =>
							<li key={blog.id}>{blog.title}</li>
						)
					}
				</ul>

			</>
		)
	} else {
		return null
	}
}

export default User