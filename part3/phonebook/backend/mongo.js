const mongoose = require("mongoose")
if (process.argv.length < 3) {
	console.log("Usage: node mongo.js [password] [name] [number]")
	process.exit(1)
}

const password = process.argv[2]
const url =
	`mongodb+srv://thiv:${password}@fullstack-notes-cluster-rkbyz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const contactSchema = new mongoose.Schema({
	name: String,
	number: String
})
const Contact = mongoose.model("Contact", contactSchema)

if (process.argv.length == 3) {
	console.log("phonebook:")
	Contact.find({}).then(result => {
		result.forEach(contact => {
			console.log(contact.name, contact.number)
		})
		mongoose.connection.close()
	})
} else {
	new Contact({ name: process.argv[3], number: process.argv[4] })
		.save()
		.then(() => {
			console.log("Contact saved!")
			mongoose.connection.close()
		})
}

