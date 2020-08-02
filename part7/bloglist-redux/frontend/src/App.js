import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initBlogs())
		dispatch(initUser())
	}, [dispatch])

	if (user === null) {
		return (
			<>
				<Notification />
				<LoginForm />
			</>
		)
	} else {
		return (
			<>
				<Notification />
				<h2>Blogs</h2>
				<LoginForm />
				<Togglable showLabel="New Blog" hideLabel="Cancel">
					<BlogForm />
				</Togglable>
				<BlogList />
			</>
		)
	}
}

export default App