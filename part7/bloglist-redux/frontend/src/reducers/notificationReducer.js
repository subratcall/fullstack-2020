const initialNotif = { message: null, error: false }
let timeoutId

export const setNotif = (message, error, seconds) => {
	return async dispatch => {
		dispatch({ type: 'SET_NOTIF', data: { message, error } })
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(
			() => dispatch({ type: 'SET_NOTIF', data: initialNotif }),
			seconds * 1000)
	}
}

const reducer = (state = initialNotif, action) => {
	switch (action.type) {
		case "SET_NOTIF":
			return action.data
		default:
			return state
	}
}

export default reducer