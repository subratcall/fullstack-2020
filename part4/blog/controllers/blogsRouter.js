const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	if (!req.body.title || !req.body.url) {
		return res.status(400).end()
	}

	if (!req.body.likes) {
		req.body.likes = 0
	}

	const blog = new Blog(req.body)
	const result = await blog.save()
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