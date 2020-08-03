import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Switch, Route, Link, useHistory } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initBlogs())
		dispatch(initUser())
		dispatch(initUsers())
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
				<Menu />
				<Notification />
				<Switch>
					<Route path="/blogs">
						<h2>Blogs</h2>
						<Togglable showLabel="New Blog" hideLabel="Cancel">
							<BlogForm />
						</Togglable>
						<BlogList />
					</Route>

					<Route path="/users">
						<UserList />
					</Route>
				</Switch>
				<br />
			</>
		)
	}
}

export default App