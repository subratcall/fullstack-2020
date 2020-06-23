const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(401).send({ error: 'Malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(401).json({ error: error.message })
	}
	next(error)
}

module.exports = { errorHandler }