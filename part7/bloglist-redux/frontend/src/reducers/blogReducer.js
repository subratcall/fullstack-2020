import blogService from '../services/blogs'

const INIT = 'INIT_BLOGS'
const ADD = 'ADD_BLOG'
const LIKE = 'UPDATE_LIKES'
const COMMENT = 'UPDATE_COMMENTS'
const DELETE = 'DELETE_BLOG'

export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({ type: INIT, data: blogs })
	}
}

export const createBlog = (blog) => {
	return async dispatch => {
		const newBlog = await blogService.create(blog)
		dispatch({ type: ADD, data: newBlog })
		return newBlog
	}
}

export const addLike = (id, blog) => {
	return async dispatch => {
		const newBlog = await blogService.update(
			id, { ...blog, likes: blog.likes + 1 }
		)
		dispatch({ type: LIKE, data: newBlog })
	}
}

//NEED TO FIX
export const addComment = (blog, comment) => {
	return async dispatch => {
		const newBlog = await blogService.createComment(blog.id, comment)
		dispatch({ type: COMMENT, data: newBlog })
	}
}

export const deleteBlog = (id) => {
	return async dispatch => {
		const deleted = await blogService.remove(id)
		dispatch({ type: DELETE, data: deleted })
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case INIT:
			return action.data
		case ADD:
			return state.concat(action.data)
		case LIKE:
		case COMMENT:
			const newBlog = action.data
			return state.map(b => b.id === newBlog.id ? newBlog : b)
		case DELETE:
			const deleted = action.data
			return state.filter(b => b.id !== deleted.id)
		default:
			return state
	}
}

export default reducer