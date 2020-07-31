import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, remove }) => {
	const addLike = () => {
		update({
			user: blog.user,
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url,
			id: blog.id
		})
	}

	const removeBlog = () => {
		if (window.confirm(
			`Are you sure you want to delete "${blog.title}" by ${blog.author}?`
		)) remove(blog.id)
	}

	return (<div>
		{blog.title} {blog.author}
		<br />
		{blog.url}
		<br />
		{blog.likes} <button onClick={addLike}>Like</button>
		<br />
		<button onClick={removeBlog}>Remove</button>

	</div >)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	update: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
}

export default Blog
