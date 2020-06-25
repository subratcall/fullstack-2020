const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1, id: 1 })
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	if (!body.title || !body.url) {
		return res.status(400).end()
	}

	if (!body.likes) {
		body.likes = 0
	}

	const blog = new Blog({
		author: body.author,
		title: body.title,
		url: body.url,
		likes: body.likes,
		user: body.userId
	})

	const result = await blog.save()
	const user = await User.findById(body.userId)

	user.blogs = user.blogs.concat(result._id)
	await user.save()

	res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	if (!req.body.title || !req.body.url) {
		return res.status(400).end()
	}

	if (!req.body.likes) {
		req.body.likes = 0
	}

	const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
	res.status(200).json(result)
})

module.exports = blogsRouter