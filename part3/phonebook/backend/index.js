require("dotenv").config()
const express = require("express")
const app = express()
const Contact = require("./models/contact")
const cors = require("cors")

app.use(express.json())
app.use(express.static("build"))
app.use(cors())

app.get("/info", (req, res, next) => {
	res.contentType("html")
	Contact.find({})
		.then(contacts => {
			res.write(`Phone book has info for ${contacts.length} people`)
			res.write(`<br/> ${(new Date())}`)
		})
		.catch(error => next(error))
})

app.get("/api/persons", (req, res, next) => {
	Contact.find({})
		.then(contacts => res.json(contacts))
		.catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
	Contact.findById(req.params.id)
		.then(contact => res.json(contact))
		.catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
	Contact.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
	const body = req.body

	if (!body.name || !body.number) {
		return res.status(400).json({ error: "Name/number is missing" })
	} else {
		const contact = new Contact({
			name: body.name,
			number: body.number,
		})
		contact.save()
			.then(newContact => res.json(newContact))
			.catch(error => next(error))
	}
})

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body

	const contact = {
		name: body.name,
		number: body.number
	}

	Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
		.then(updatedContact => res.json(updatedContact))
		.catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
	console.error(error.message)
	if (error.name === "CastError") {
		return res.status(400).send({ error: "Malformatted Id" })
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message })
	}
	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})