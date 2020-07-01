import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const create = async (anecdote) => {
	const obj = {
		content: anecdote,
		id: (100000 * Math.random()).toFixed(0),
		votes: 0
	}
	const res = await axios.post(baseUrl, obj)
	return res.data
}

export default { getAll, create }