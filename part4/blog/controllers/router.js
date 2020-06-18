const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

router.post('/', async (req, res) => {
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

module.exports = router