import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3003/api/users'

const create = async newObject => {
	const response = await axios.post(baseUrl, newObject)
	return response.data
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject)
	return response.data
}

const remove = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`)
	return response.data
}

export default { getAll, create, update, remove }