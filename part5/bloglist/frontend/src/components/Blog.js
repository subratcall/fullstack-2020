import React from 'react'
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
		{blog.title}
		<br />
		{blog.url}
		<br />
		{blog.likes} <button onClick={addLike}>Like</button>
		<br />
		{blog.author}
		<br />
		<button onClick={removeBlog}>Remove</button>

	</div >)
}

export default Blog
