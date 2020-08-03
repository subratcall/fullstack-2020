import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import {
	useRouteMatch,
	Switch,
	Route,
	Link
} from 'react-router-dom'

const BlogList = (props) => {
	const match = useRouteMatch('/blogs/:blogId')
	const blog = match
		? props.blogs.find(user => user.id === match.params.blogId)
		: null

	return (
		<Switch>
			<Route path="/blogs/:blogId">
				<Blog blog={blog} />
			</Route>
			<Route path="/blogs">
				{
					props.blogs.map(blog => {
						return (
							<div key={blog.id}
								style={{
									border: "2px solid",
									margin: "0.5rem",
									padding: "4px"
								}}>
								<Link to={`blogs/${blog.id}`}>{blog.title}</Link>
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