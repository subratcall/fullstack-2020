import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ create }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const textChange = event => {
		switch (event.target.name) {
			case "Title":
				setTitle(event.target.value)
				break
			case "Author":
				setAuthor(event.target.value)
				break
			case "URL":
				setUrl(event.target.value)
				break
			default:
				break
		}
	}

	const addBlog = async event => {
		event.preventDefault()
		await create({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<h2>Add Blog</h2>
			<div>
				Title:
			<input type="text" name="Title" value={title} onChange={textChange}></input>
			</div>
			<div>
				Author:
			<input type="text" name="Author" value={author} onChange={textChange}></input>
			</div>
			<div>
				URL:
			<input type="text" name="URL" value={url} onChange={textChange}></input>
			</div>
			<button type="submit">Add</button>
		</form>
	)
}

BlogForm.propTypes = { create: PropTypes.func.isRequired }

export default BlogForm