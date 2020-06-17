const mongoose = require("mongoose")
const unique = require("mongoose-unique-validator")
mongoose.set("useFindAndModify", false) //findByIdAndUpdate deprecation warning
mongoose.set("useCreateIndex", true) //unique-validator deprecation warning


const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		unique: true
	},
	number: {
		type: String,
		minlength: 8
	}
})
contactSchema.plugin(unique)
contactSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Contact", contactSchema)