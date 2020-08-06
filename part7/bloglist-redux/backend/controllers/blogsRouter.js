const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1, id: 1 })
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	const token = req.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

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
		user: user.id,
		comments: []
	})
	const result = await blog.save()
	user.blogs = user.blogs.concat(result._id)
	await user.save()

	res.status(201).json(result)
})

blogsRouter.post('/:id/comments', async (req, res) => {
	const body = req.body
	const token = req.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	if (!body) {
		return res.status(400).end()
	}

	const blog = await Blog.findById(req.params.id)
	blog.comments = blog.comments.concat(body.comment)
	const result = await blog.save()

	res.status(200).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body
	const token = req.token

	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	if (!body.title || !body.url) {
		return res.status(400).end()
	}

	if (!body.likes) {
		body.likes = 0
	}

	const user = await User.findById(decodedToken.id)

	const formattedBlog = {
		user: user._id,
		likes: body.likes,
		author: body.author,
		title: body.title,
		url: body.url,
		_id: body.id
	}

	const result = await Blog.findByIdAndUpdate(req.params.id, formattedBlog, { new: true })
	res.status(200).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
	const token = req.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await User.findById(decodedToken.id)
	const blog = await Blog.findById(req.params.id)
	if (blog.user.toString() !== user._id.toString()) {
		return res.status(401).json({ error: 'user not authorized to delete' })
	}
	const result = await Blog.findByIdAndRemove(req.params.id)

	const userBlogs = user.blogs.filter(blog => blog._id !== req.params.id)
	user.blogs = userBlogs
	await user.save()

	res.status(200).json(result)
})

module.exports = blogsRouter