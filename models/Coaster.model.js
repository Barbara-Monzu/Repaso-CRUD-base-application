const mongoose = require('mongoose')
const Schema = mongoose.Schema


const coasterModel = new Schema({
  name: String,
	description: String,
	inversions:	Number,
	length:		Number,
	active:		Boolean,
	park_id:	{ type: Schema.Types.ObjectId, ref: 'Park' }
})

module.exports = mongoose.model('Coaster', coasterModel)
