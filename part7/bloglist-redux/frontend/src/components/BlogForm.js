import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notificationReducer'
import { initUsers } from '../reducers/userReducer'

const BlogForm = (props) => {
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
		props.createBlog({ title, author, url })
			.then(() => {
				props.setNotif("Successfully added blog", false, 5)
				props.initUsers()
			})
			.catch(() => props.setNotif("Failed to add blog: missing fields", true, 5))

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<h2>New Blog</h2>
			<div>
				Title:
			<input id="title" type="text" name="Title" value={title} onChange={textChange}></input>
			</div>
			<div>
				Author:
			<input id="author" type="text" name="Author" value={author} onChange={textChange}></input>
			</div>
			<div>
				URL:
			<input id="url" type="text" name="URL" value={url} onChange={textChange}></input>
			</div>
			<button type="submit">Add</button>

		</form>
	)
}

const mapDispatchToProps = {
	createBlog, setNotif, initUsers
}

export default connect(null, mapDispatchToProps)(BlogForm)