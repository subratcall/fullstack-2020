const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('Initially 1 user', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash("jackalope", 10)
		const user = new User({ username: 'root', password: passwordHash })
		await user.save()
	})

	test('new unique user', async () => {
		let usersOld = await User.find({})
		usersOld = usersOld.map(u => u.toJSON())

		const newUser = { username: 'Thiv', name: 'Thivagar Nadarajan', password: 'hello' }

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		let usersNew = await User.find({})
		usersNew = usersNew.map(u => u.toJSON())
		expect(usersNew.length).toBe(usersOld.length + 1)

		const usernames = usersNew.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('id property', async () => {
		const res = await api.get('/api/users')
		for (let user of res.body) {
			expect(user.id).toBeDefined()
		}
	})

	test('missing password', async () => {
		let usersOld = await User.find({})
		usersOld = usersOld.map(u => u.toJSON())

		const newUser = { username: 'Thiv', name: 'Thivagar Nadarajan' }

		await api
			.post('/api/users')
			.send(newUser)
			.expect(401)

		let usersNew = await User.find({})
		usersNew = usersNew.map(u => u.toJSON())
		expect(usersNew.length).toBe(usersOld.length)

	})

	test('missing username', async () => {
		let usersOld = await User.find({})
		usersOld = usersOld.map(u => u.toJSON())

		const newUser = { password: '1234', name: 'Thivagar Nadarajan' }

		await api
			.post('/api/users')
			.send(newUser)
			.expect(401)

		let usersNew = await User.find({})
		usersNew = usersNew.map(u => u.toJSON())
		expect(usersNew.length).toBe(usersOld.length)

	})

	afterAll(() => {
		mongoose.connection.close()
	})
})



