import React from 'react'

const BlogForm = ({ title, author, url, addBlog, handleChange, handleSubmit }) => (
	<form onSubmit={handleSubmit}>
		<h2>Add Blog</h2>
		<div>
			Title:
			<input type="text" name="Title" value={title} onChange={handleChange}></input>
		</div>
		<div>
			Author:
			<input type="text" name="Author" value={author} onChange={handleChange}></input>
		</div>
		<div>
			URL:
			<input type="text" name="URL" value={url} onChange={handleChange}></input>
		</div>
		<button type="submit">Add</button>
	</form>
)

export default BlogForm