const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

export const createAnecdote = (content) => {
	return { type: 'ADD', data: { content } }
}

export const addVote = (id) => {
	return { type: 'VOTE', data: { id } }
}

export const initAnecdotes = (anecdotes) => {
	return {
		type: 'INIT',
		data: anecdotes
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD': {
			const anecdote = action.data.content
			return state.concat(asObject(anecdote))
		}
		case 'VOTE': {
			const id = action.data.id
			const anecdote = state.find(a => a.id === id)
			const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
			return state.map(a => a.id === id ? newAnecdote : a)
		}
		case 'INIT': {
			return action.data
		}
		default:
			return state
	}
}

export default reducer