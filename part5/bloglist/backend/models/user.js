const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		required: true,
		minlength: 3,
		unique: true,
		type: String
	},
	name: String,
	password: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog' //This helps populate replace the blogs array with Blog Schema Objects
		}
	]
})

userSchema.plugin(unique)
userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

module.exports = mongoose.model('User', userSchema)