const Match = require('../models/Match')

const updateMatches = async (req, res) => {
	const matchesToBeUpdated = req.body
	try {
		matchesToBeUpdated.map(async (match) => {
			const { _id, homeScore, awayScore } = match
			await Match.updateOne({ _id }, { $set: { homeScore, awayScore } })
		})

		res.status(201).send('Matches updated successfully.')
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	updateMatches,
}
