const initialNotif = 'No new notifications'

export const setNotif = notif => {
	return {
		type: 'SET_NOTIF',
		notif
	}
}

export const resetNotif = () => {
	return {
		type: 'RESET_NOTIF',
	}
}

const reducer = (state = initialNotif, action) => {
	switch (action.type) {
		case "SET_NOTIF":
			return action.notif
		case "RESET_NOTIF":
			return initialNotif
		default:
			return state
	}
}

export default reducer