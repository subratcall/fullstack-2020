import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

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

import { Title } from './styles/styles'

const App = () => {
	const history = useHistory()
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initBlogs())
		dispatch(initUser())
		dispatch(initUsers())
	}, [dispatch])

	if (user === null) {
		history.push("/")
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
				<Menu />
				<Switch>
					<Route path="/blogs">
						<Title>Blogs</Title>
						<Togglable showLabel="New Blog" hideLabel="Cancel">
							<BlogForm />
						</Togglable>
						<BlogList />
					</Route>
					<Route path="/users">
						<UserList />
					</Route>
					<Route path="/">
						<Redirect to="/blogs" />
					</Route>
				</Switch>
			</>
		)
	}
}

export default App