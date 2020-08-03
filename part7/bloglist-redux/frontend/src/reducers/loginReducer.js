import loginService from '../services/login'
import blogService from '../services/blogs'

const LOGIN = 'LOGIN'
const INIT = 'INIT_USER'
const SET = 'SET_USER'
const CLEAR = 'CLEAR_USER'

export const login = (username, password) => {
	return async dispatch => {
		const user = await loginService.login({ username, password })
		blogService.setToken(user.token)
		window.localStorage.setItem('user', JSON.stringify(user))
		dispatch({ type: LOGIN, data: user })
	}
}

export const initUser = () => {
	return async dispatch => {
		const loggedUser = window.localStorage.getItem('user')
		if (loggedUser !== 'undefined' && loggedUser) {
			const parsedUser = JSON.parse(loggedUser)
			blogService.setToken(parsedUser.token)
			dispatch({ type: INIT, data: parsedUser })
		}
	}
}

export const setUser = (user) => {
	return async dispatch => {
		blogService.setToken(user.token)
		dispatch({ type: SET, data: user })
	}
}

export const clearUser = () => {
	return async dispatch => {
		window.localStorage.removeItem('user')
		dispatch({ type: CLEAR })
	}
}

const reducer = (state = null, action) => {
	switch (action.type) {
		case LOGIN:
		case INIT:
		case SET:
			return action.data
		case CLEAR:
			return null
		default:
			return state
	}
}

export default reducer