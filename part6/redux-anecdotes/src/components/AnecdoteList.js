import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

/* Disconnected component */
// const AnecdoteList = () => {
// 	const filter = useSelector(state => state.filter)
// 	const anecdotes = useSelector(state => state.anecdotes)
// 	const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter))

// 	filtered.sort((a, b) => b.votes - a.votes) //sort filtered by vote
// 	const dispatch = useDispatch()

// 	const vote = (id) => {
// 		const anecdote = anecdotes.find(a => a.id === id)
// 		dispatch(addVote(id, anecdote))
// 		dispatch(setNotif(`You voted on '${anecdote.content}'`, 5))
// 	}

// 	return (
// 		<div>
// 			{filtered.map(anecdote =>
// 				<div key={anecdote.id}>
// 					<div>
// 						{anecdote.content}
// 					</div>
// 					<div>
// 						has {anecdote.votes}
// 						<button onClick={() => vote(anecdote.id)}>vote</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

const AnecdoteList = (props) => {
	const anecdotes = props.anecdotes

	const vote = (id) => {
		const anecdote = anecdotes.find(a => a.id === id)
		props.addVote(id, anecdote)
		props.setNotif(`You voted on '${anecdote.content}'`, 5)
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
	const filter = state.filter
	const anecdotes = state.anecdotes
	const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
	filtered.sort((a, b) => b.votes - a.votes) //sort filtered by vote
	return {
		anecdotes: filtered
	}
}

const mapDispatchToProps = {
	addVote,
	setNotif
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)