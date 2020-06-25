import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('user')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const login = async event => {
		event.preventDefault()

		const user = await loginService.login({ username, password })
		window.localStorage.setItem('user', JSON.stringify(user))
		blogService.setToken(user.token)

		setUser(user)
		setUsername('')
		setPassword('')
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.removeItem('user')
	}

	const textChange = event => {
		switch (event.target.name) {
			case "Username":
				setUsername(event.target.value)
				break
			case "Password":
				setPassword(event.target.value)
				break
			case "Title":
				setTitle(event.target.value)
				break
			case "Author":
				setAuthor(event.target.value)
				break
			case "URL":
				setUrl(event.target.value)
				break
		}
	}

	const addBlog = async event => {
		await blogService.create({ title, author, url })
	}

	if (user === null) {
		return (
			<Login
				username={username} password={password} handleSubmit={login}
				handleChange={textChange}
			/>
		)
	} else {
		return (
			<>
				<h2>Blogs</h2>
				<div>
					{`${user.name} has logged in.`}
					<button onClick={handleLogout}>Logout</button>
				</div>
				<br />
				<BlogForm
					title={title} author={author} url={url}
					handleChange={textChange} handleSubmit={addBlog}
				/>
				<br />
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</>
		)
	}
}

export default App