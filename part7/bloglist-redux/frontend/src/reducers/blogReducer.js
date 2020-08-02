import blogService from '../services/blogs'

export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({ type: 'INIT', data: blogs })
	}
}

export const createBlog = (blog) => {
	return async dispatch => {
		const newBlog = await blogService.create(blog)
		dispatch({ type: 'ADD', data: newBlog })
	}
}

export const addLike = (id, blog) => {
	return async dispatch => {
		const newBlog = await blogService.update(
			id, { ...blog, likes: blog.likes + 1 }
		)
		dispatch({ type: 'LIKE', data: newBlog })
	}
}

export const deleteBlog = (id) => {
	return async dispatch => {
		const deleted = await blogService.remove(id)
		dispatch({ type: 'DELETE', data: deleted })
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT':
			return action.data
		case 'ADD':
			return state.concat(action.data)
		case 'LIKE':
			const newBlog = action.data
			return state.map(b => b.id === newBlog.id ? newBlog : b)
		case 'DELETE':
			const deleted = action.data
			return state.filter(b => b.id !== deleted.id)
		default:
			return state
	}
}

export default reducer