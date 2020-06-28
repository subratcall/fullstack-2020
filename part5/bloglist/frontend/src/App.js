import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => {
			blogs.sort((a, b) => b.likes - a.likes)
			setBlogs(blogs)
		}

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

	const handleLogin = async event => {
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
			default:
				break
		}
	}

	const addBlog = async (blog) => {
		const addedBlog = await blogService.create(blog)
		setBlogs(blogs.concat(addedBlog))
	}

	const addLike = async (blog) => {
		const updatedBlog = await blogService.update(blog.id, blog)
		const newBlogs = blogs.map(
			b => b.id !== blog.id
				? b
				: updatedBlog
		)
		setBlogs(newBlogs)
	}

	const removeBlog = async (id) => {
		await blogService.remove(id)
		const newBlogs = blogs.filter(blog => blog.id !== id)
		setBlogs(newBlogs)
	}

	if (user === null) {
		return (
			<LoginForm
				username={username} password={password} handleSubmit={handleLogin}
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
				<Togglable showLabel="New Blog" hideLabel="Cancel">
					<BlogForm create={addBlog} />
				</Togglable>
				<br />
				{blogs.map(blog => {
					return (
						<Togglable textLabel={`${blog.title} ${blog.author}`}
							showLabel="Show" hideLabel="Hide"
							style={
								{
									border: "2px solid",
									margin: "0.5rem",
									padding: "4px"
								}
							}>
							<Blog key={blog.id} blog={blog} update={addLike} remove={removeBlog} />
						</Togglable>
					)
				}

				)}
			</>
		)
	}
}

export default App