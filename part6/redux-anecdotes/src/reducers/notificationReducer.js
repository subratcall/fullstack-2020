const initialNotif = 'No new notifications'

export const setNotif = (notif, seconds) => {
	return async dispatch => {
		dispatch({ type: 'SET_NOTIF', notif })
		dispatch({ type: 'CLEAR' })
		const id = setTimeout(
			() => dispatch({ type: 'SET_NOTIF', notif: initialNotif }),
			seconds * 1000)
		dispatch({ type: 'SET_ID', id })
	}
}

const reducer = (state = initialNotif, action) => {
	switch (action.type) {
		case "SET_NOTIF":
			return { ...state, message: action.notif }
		case "SET_ID":
			return { ...state, id: action.id }
		case "CLEAR":
			if (state.id) clearTimeout(state.id)
			return state
		default:
			return state
	}
}

export default reducer