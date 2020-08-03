import userService from '../services/users'

const INIT = 'INIT_USERS'

export const initUsers = () => {
	return async dispatch => {
		const blogs = await userService.getAll()
		dispatch({ type: INIT, data: blogs })
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case INIT:
			return action.data
		default:
			return state
	}
}

export default reducer