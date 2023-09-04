const League = require('../models/League')
const Match = require('../models/Match')
const mongoose = require('mongoose')

const getLeague = async (req, res) => {
	const leagueId = req.params.id
	try {
		const league = await League.findById(leagueId)
		if (!league) {
			res.status(404).json({ message: 'League Not Found.' })
		} else {
			const leagueMatches = await Match.aggregate([
				{ $match: { leagueId: new mongoose.Types.ObjectId(leagueId) } },
				{
					$group: {
						_id: '$round', // Group by the 'round' field
						matches: {
							$push: {
								_id: '$_id',
								homeTeam: '$homeTeam',
								homeScore: '$homeScore',
								awayTeam: '$awayTeam',
								awayScore: '$awayScore',
							},
						}, // Store the matching documents in an array
					},
				},
				{
					$sort: { _id: 1 }, // Sort by 'round' in ascending order
				},
				{
					$project: {
						_id: 0, // Exclude the _id field
						round: '$_id', // Rename _id to round
						matches: 1, // Include the matches field
					},
				},
			])
			const modifiedLeague = {
				...league.toObject(), // Convert the Mongoose document to a plain object
				fixture: leagueMatches,
			}
			res.status(200).json(modifiedLeague)
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const createLeague = async (req, res) => {
	const league = await League.create(req.body)
	const teams = req.body.teams.sort(() => Math.random() - 0.5)
	const rematch = req.body.rematch
	let stepSize = teams.length - 1
	const matches = []
	const rematches = []

	// if # of teams odd, add one
	if (teams.length % 2 !== 0) {
		stepSize = teams.length
		teams.push('Free')
	}
	const teamsLength = teams.length
	// make the first round;
	let i = 0,
		j = teamsLength - 1
	let currentRound
	const firstRound = []
	while (i < j) {
		firstRound.push(teams[i])
		firstRound.push(teams[j])
		matches.push({
			leagueId: league._id,
			homeTeam: teams[i],
			// homeScore: null,
			awayTeam: teams[j],
			// awayScore: null,
			round: 1,
		})
		if (rematch) {
			rematches.push({
				leagueId: league._id,
				homeTeam: teams[j],
				// homeScore: null,
				awayTeam: teams[i],
				// awayScore: null,
				round: 1 + stepSize,
			})
		}

		i += 1
		j -= 1
	}

	currentRound = [...firstRound]
	for (let round = 2; round <= teamsLength - 1; round++) {
		var currentCopy = [...currentRound]
		const newRound = []
		newRound.push(currentCopy[teamsLength - 1])
		newRound.push(currentCopy[1])
		matches.push({
			leagueId: league._id,
			homeTeam: currentCopy[teamsLength - 1],
			// homeScore: null,
			awayTeam: currentCopy[1],
			// awayScore: null,
			round: round,
		})
		if (rematch) {
			rematches.push({
				leagueId: league._id,
				homeTeam: currentCopy[1],
				// homeScore: null,
				awayTeam: currentCopy[teamsLength - 1],
				// awayScore: null,
				round: round + stepSize,
			})
		}
		currentCopy.splice(teamsLength - 1, 1)
		currentCopy.splice(1, 1)
		for (let x = currentCopy.length - 2; x >= 0; x -= 2) {
			newRound.push(currentCopy[x])
			newRound.push(currentCopy[x + 1])
			matches.push({
				leagueId: league._id,
				homeTeam: currentCopy[x],
				// homeScore: null,
				awayTeam: currentCopy[x + 1],
				// awayScore: null,
				round: round,
			})
			if (rematch) {
				rematches.push({
					leagueId: league._id,
					homeTeam: currentCopy[x + 1],
					// homeScore: null,
					awayTeam: currentCopy[x],
					// awayScore: null,
					round: round + stepSize,
				})
			}
		}

		currentRound = [...newRound]
	}
	const allMatches = [...matches, ...rematches]

	const fixture = await Match.insertMany(allMatches)
	const modifiedLeague = {
		...league.toObject(), // Convert the Mongoose document to a plain object
		matches: fixture,
	}
	res.status(201).json(modifiedLeague)
}

module.exports = {
	getLeague,
	createLeague,
}
