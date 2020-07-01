import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.create(content)
		dispatch({ type: 'ADD', data: newAnecdote })
	}
}

export const addVote = (id, anecdote) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.update(
			id, { ...anecdote, votes: anecdote.votes + 1 }
		)
		dispatch({ type: 'VOTE', data: newAnecdote })
	}
}

export const initAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({ type: 'INIT', data: anecdotes })
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD': {
			return state.concat(action.data)
		}
		case 'VOTE': {
			const newAnecdote = action.data
			return state.map(a => a.id === newAnecdote.id ? newAnecdote : a)
		}
		case 'INIT': {
			return action.data
		}
		default:
			return state
	}
}

export default reducer