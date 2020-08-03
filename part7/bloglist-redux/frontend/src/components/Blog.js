import React from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notificationReducer'
import { initUsers } from '../reducers/userReducer'

const Blog = (props) => {
	const addLike = () => {
		props.addLike(props.blog.id, props.blog)
			.then(() => props.setNotif("Successfully updated blog", false, 5))
			.catch(() => props.setNotif("Failed to update blog: not authorized", true, 5))
	}

	const deleteBlog = () => {
		if (window.confirm(
			`Are you sure you want to delete "${props.blog.title}" by ${props.blog.author}?`)
		) {
			props.deleteBlog(props.blog.id)
				.then(() => {
					props.setNotif("Successfully deleted blog", false, 5)
					props.initUsers()
				})
				.catch(() => props.setNotif("Failed to delete blog: not authorized", true, 5))

		}
	}

	return (
		<div>
			{props.blog.title} {props.blog.author}
			<br />
			{props.blog.url}
			<br />
			{props.blog.likes} <button onClick={addLike}>Like</button>
			<br />
			<button onClick={deleteBlog}>Remove</button>
		</div >
	)
}

const mapDispatchToProps = {
	addLike, deleteBlog, setNotif, initUsers
}

export default connect(null, mapDispatchToProps)(Blog)

