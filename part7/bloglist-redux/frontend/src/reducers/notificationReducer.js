const initialNotif = { message: null, error: false }
let timeoutId

const SET = 'SET_NOTIF'

export const setNotif = (message, error, seconds) => {
	return async dispatch => {
		dispatch({ type: SET, data: { message, error } })
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(
			() => dispatch({ type: SET, data: initialNotif }),
			seconds * 1000)
	}
}

const reducer = (state = initialNotif, action) => {
	switch (action.type) {
		case SET:
			return action.data
		default:
			return state
	}
}

export default reducer