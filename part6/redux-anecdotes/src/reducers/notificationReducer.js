const initialNotif = 'No new notifications'

export const setNotif = (notif, seconds) => {
	return async dispatch => {
		dispatch({ type: 'SET_NOTIF', notif })
		setTimeout(
			() => dispatch({ type: 'SET_NOTIF', notif: initialNotif }),
			seconds * 1000)
	}
}

const reducer = (state = initialNotif, action) => {
	switch (action.type) {
		case "SET_NOTIF":
			return action.notif
		default:
			return state
	}
}

export default reducer