const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(401).send({ error: 'Malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(401).json({ error: error.message })
	}
	next(error)
}

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	let token = null
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7)
		req.token = token
	}
	next()
}

module.exports = { errorHandler, tokenExtractor }