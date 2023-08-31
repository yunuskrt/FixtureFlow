const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'league name must be provided'],
	},
	winPoint: {
		type: Number,
		default: 3,
	},
	drawPoint: {
		type: Number,
		default: 1,
	},
	losePoint: {
		type: Number,
		default: 0,
	},
	rematch: {
		type: Boolean,
		default: false,
	},

	teams: {
		type: Array,
		required: [true, 'teams in the league must be provided'],
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('League', leagueSchema)
