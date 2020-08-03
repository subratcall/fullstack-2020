import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import {
	useRouteMatch,
	Switch,
	Route,
	Link
} from 'react-router-dom'

const BlogList = (props) => {
	const match = useRouteMatch('/:blogId')
	const blog = match
		? props.blogs.find(user => user.id === match.params.blogId)
		: null

	return (
		<Switch>
			<Route path="/:blogId">
				<Blog blog={blog} />
			</Route>
			<Route path="/">
				{
					props.blogs.map(blog => {
						return (
							<div key={blog.id}
								style={{
									border: "2px solid",
									margin: "0.5rem",
									padding: "4px"
								}}>
								<Link to={`/${blog.id}`}>{blog.title}</Link>
							</div>
						)
					})
				}
			</Route>
		</Switch>

	)
}

const mapStateToProps = (state) => {
	state.blogs.sort((a, b) => b.likes - a.likes)
	return { blogs: state.blogs }
}

export default connect(mapStateToProps, null)(BlogList)