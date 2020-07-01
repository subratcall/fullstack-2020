import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotif, resetNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const filter = useSelector(state => state.filter)
	const anecdotes = useSelector(state => state.anecdotes)
	const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter))

	filtered.sort((a, b) => b.votes - a.votes) //sort filtered by vote
	const dispatch = useDispatch()

	const vote = (id) => {
		const anecdote = anecdotes.find(a => a.id === id)
		dispatch(addVote(id, anecdote))
		// const anecdote = anecdotes.find(a => a.id === id).content
		dispatch(setNotif(`You voted on '${anecdote.content}'`))
		setTimeout(() => { dispatch(resetNotif()) }, 5000)
	}

	return (
		<div>
			{filtered.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList