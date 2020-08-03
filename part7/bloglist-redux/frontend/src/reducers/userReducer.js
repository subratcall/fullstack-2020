import userService from '../services/users'

const INIT = 'INIT_USERS'
const ADD = 'ADD_USER'
const DELETE = 'DELETE_USER'

export const initUsers = () => {
	return async dispatch => {
		const blogs = await userService.getAll()
		dispatch({ type: INIT, data: blogs })
	}
}

export const createUser = (blog) => {
	return async dispatch => {
		const newBlog = await userService.create(blog)
		dispatch({ type: ADD, data: newBlog })
	}
}

export const deleteUser = (id) => {
	return async dispatch => {
		const deleted = await userService.remove(id)
		dispatch({ type: DELETE, data: deleted })
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case INIT:
			return action.data
		case ADD:
			return state.concat(action.data)
		case DELETE:
			const deleted = action.data
			return state.filter(b => b.id !== deleted.id)
		default:
			return state
	}
}

export default reducer