const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
	leagueId: {
		type: mongoose.Types.ObjectId,
		required: [true, 'league id must be provided'],
	},
	homeTeam: {
		type: String,
		required: [true, 'home team must be provided'],
	},
	homeScore: {
		type: Number,
		default: null,
	},
	awayTeam: {
		type: String,
		required: [true, 'away team must be provided'],
	},
	awayScore: {
		type: Number,
		default: null,
	},
	round: {
		type: Number,
		required: [true, 'round must be provided'],
	},
})

module.exports = mongoose.model('Match', matchSchema)
