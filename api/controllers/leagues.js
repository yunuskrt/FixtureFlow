const League = require('../models/League')
const Match = require('../models/Match')

// const { BadRequestError, NotFoundError } = require('../errors')

const getLeague = async (req, res) => {
	const leagueId = req.params.id
	try {
		const league = await League.findById(leagueId)
		if (!league) {
			res.status(404).json({ message: 'League Not Found.' })
		} else {
			const leagueMatches = await Match.find(
				{ leagueId: leagueId },
				'_id homeTeam homeScore awayTeam awayScore round'
			)
			const modifiedLeague = {
				...league.toObject(), // Convert the Mongoose document to a plain object
				matches: leagueMatches,
			}
			res.status(200).json(modifiedLeague)
		}
	} catch (error) {
		res.status(404).json({ message: 'League Not Found.' })
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
