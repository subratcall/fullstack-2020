import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addLike, addComment, deleteBlog } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notificationReducer'
import { initUsers } from '../reducers/userReducer'

const CommentForm = ({blog, addComment}) => {
	const [comment, setComment] = useState('')

	const submitComment = (event) => {
		event.preventDefault()
		addComment(blog, comment)
		setComment('')
	}

	return (
		<form onSubmit={submitComment}>
			<input type="text" name="Comment"
				value={comment} onChange={event => setComment(event.target.value)}>
			</input>
			<button type="submit">Add Comment</button>
		</form>
	)
}

const Blog = (props) => {
	const blog = props.blog
	const history = useHistory()

	const addLike = () => {
		props.addLike(blog.id, blog)
			.then(() => props.setNotif("Successfully updated blog", false, 5))
			.catch(() => props.setNotif("Failed to update blog: not authorized", true, 5))
	}

	const deleteBlog = () => {
		if (window.confirm(
			`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)
		) {
			props.deleteBlog(blog.id)
				.then(() => {
					props.setNotif("Successfully deleted blog", false, 5)
					props.initUsers()
					history.push("/blogs")
				})
				.catch(() => props.setNotif("Failed to delete blog: not authorized", true, 5))

		}
	}

	if (blog) {
		return (
			<div>
				<h2>{blog.title}</h2>
				<a href={`${blog.url}`}>{blog.url}</a>
				<br />
				{blog.likes} likes
				<button onClick={addLike}>Like</button>
				<br />
				Added by {blog.author}
				<br />
				<button onClick={deleteBlog}>Remove</button>
				<br />
				<h3>Comments</h3>
				<ul>
					{blog.comments.map(comment => <li key={comment}>{comment}</li>)}
				</ul>
				<CommentForm blog={blog} addComment={props.addComment} />
			</div >
		)
	} else {
		return null
	}

}

const mapDispatchToProps = {
	addLike, deleteBlog, setNotif, initUsers, addComment
}

export default connect(null, mapDispatchToProps)(Blog)

