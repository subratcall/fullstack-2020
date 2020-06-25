const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
})

test('post user & blog', async () => {
	const newUser = {
		name: "Thivagar",
		username: "root",
		password: "pass",
	}
	await api.post('/api/users').send(newUser)
	const user = await User.find({})
	const id = user[0]._id

	const newBlog = {
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		userId: id
	}
	await api.post('/api/blogs').send(newBlog)

	const res = await api.get('/api/blogs')
	console.log("Blogs:", res.body)

	const res2 = await api.get('/api/users')
	console.log("Users' Blogs:", res2.body[0])

})


afterAll(() => {
	mongoose.connection.close()
})