import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogList = (props) => {
	return (
		props.blogs.map(blog => {
			return (
				<Togglable key={blog.id} showLabel="Show" hideLabel="Hide"
					textLabel={`${blog.title} ${blog.author}`}
					style={
						{
							border: "2px solid",
							margin: "0.5rem",
							padding: "4px"
						}
					}>
					<Blog key={blog.id} blog={blog} />
				</Togglable>
			)
		})
	)
}

const mapStateToProps = (state) => {
	state.blogs.sort((a, b) => b.likes - a.likes)
	return { blogs: state.blogs }
}

export default connect(mapStateToProps, null)(BlogList)