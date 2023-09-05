import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import LeagueTitle from '../components/LeagueTitle'
import MatchInput from '../components/MatchInput'
import axios from 'axios'
import { IxPagination, IxButton, IxIcon } from '@siemens/ix-react'
import '../styles/pages/league.css'
const League = () => {
	const { id } = useParams()
	const [leagueData, setLeagueData] = useState(null)
	const [leagueExists, setLeagueExists] = useState(true)
	const getMatchesForRound = (matches, roundNumber) => {
		const roundMatch = matches.find((match) => match.round === roundNumber)
		if (roundMatch) {
			return [...roundMatch.matches]
		} else {
			return []
		}
	}
	const [paginationContent, setPaginationContent] = useState([])
	const [updatedMatches, setUpdatedMatches] = useState([])
	const handleMatchChange = (newMatch) => {
		const index = updatedMatches.findIndex(
			(match) => match._id === newMatch._id
		)
		if (index === -1) {
			updatedMatches.push(newMatch)
			setUpdatedMatches(updatedMatches)
		} else {
			updatedMatches[index] = newMatch
			setUpdatedMatches(updatedMatches)
		}
	}
	useEffect(() => {
		async function fetchData() {
			try {
				await axios
					.get(`http://localhost:5000/api/leagues/${id}`)
					.then((response) => {
						if (response.status === 200) {
							setLeagueData(response.data)
							setPaginationContent(getMatchesForRound(response.data.fixture, 1))
						} else {
							console.log('Invalid Page.')
						}
					})
			} catch (error) {
				setLeagueExists(false)
			}
		}
		fetchData()
	}, [id])

	return (
		<div style={{ width: '100%' }}>
			{leagueExists ? (
				leagueData === null ? (
					<div>loading</div>
				) : (
					<div>
						<LeagueTitle
							league={{
								title: leagueData.name,
								winPoint: leagueData.winPoint,
								drawPoint: leagueData.drawPoint,
								losePoint: leagueData.losePoint,
								rematch: leagueData.rematch,
								createdAt: leagueData.createdAt,
							}}
						/>
						<Header title='Standings' />
						<div className='ptable'>
							<table>
								<tr className='col'>
									<th>#</th>
									<th>Team</th>
									<th>GP</th>
									<th>W</th>
									<th>D</th>
									<th>L</th>
									<th>PTS</th>
								</tr>
								<tr className='pos'>
									<td>1</td>
									<td>Teajsjksd 1</td>
									<td>2</td>
									<td>2</td>
									<td>0</td>
									<td>0</td>
									<td>6</td>
								</tr>
								<tr className='pos'>
									<td>2</td>
									<td>Team 2</td>
									<td>2</td>
									<td>2</td>
									<td>0</td>
									<td>0</td>
									<td>6</td>
								</tr>
								<tr className='pos'>
									<td>3</td>
									<td>Team 3</td>
									<td>2</td>
									<td>1</td>
									<td>1</td>
									<td>0</td>
									<td>4</td>
								</tr>
								<tr className='pos'>
									<td>4</td>
									<td>Team 4</td>
									<td>2</td>
									<td>1</td>
									<td>1</td>
									<td>0</td>
									<td>4</td>
								</tr>
								<tr className='pos'>
									<td>5</td>
									<td>Team 5</td>
									<td>2</td>
									<td>1</td>
									<td>0</td>
									<td>1</td>
									<td>3</td>
								</tr>
								<tr className='pos'>
									<td>6</td>
									<td>Team 6</td>
									<td>3</td>
									<td>1</td>
									<td>0</td>
									<td>2</td>
									<td>3</td>
								</tr>
								<tr className='pos'>
									<td>7</td>
									<td>Team 7</td>
									<td>2</td>
									<td>0</td>
									<td>0</td>
									<td>2</td>
									<td>0</td>
								</tr>
							</table>
						</div>
						<Header title='Fixture' />
						{/* <pre>{JSON.stringify(leagueData, null, 2)}</pre> */}
						<div className='bottomWrapper'>
							<div className='matchInputContainer'>
								{paginationContent.map((match) => {
									return (
										<MatchInput
											match={{
												_id: match._id,
												homeTeam: match.homeTeam,
												awayTeam: match.awayTeam,
												homeScore: match.homeScore,
												awayScore: match.awayScore,
											}}
											handleInputChange={(matchData) => {
												handleMatchChange(matchData)
											}}
											key={match._id}
										/>
									)
								})}
							</div>
							{/* <pre>{JSON.stringify(paginationContent, null, 2)}</pre> */}
							<IxButton
								class='m-1'
								variant='Primary'
								onClick={async () => {
									const filteredMatchData = updatedMatches
										.filter(
											(match) =>
												match.homeScore !== null &&
												match.homeScore !== '' &&
												match.awayScore !== null &&
												match.awayScore !== ''
										)
										.map((match) => {
											return {
												_id: match._id,
												homeScore: parseInt(match.homeScore),
												awayScore: parseInt(match.awayScore),
											}
										})
									console.log(filteredMatchData)
									if (filteredMatchData.length !== 0) {
										await axios
											.put(
												'http://localhost:5000/api/matches',
												filteredMatchData
											)
											.then((response) => {
												console.log('PUT request successful:', response.data)
												alert('Matches updated successfully.')
												window.location.reload()
											})
											.catch((error) => {
												console.log('Error making PUT request:', error.message)
											})
									}
								}}
							>
								<IxIcon name='namur-ok-filled'></IxIcon>Save Changes
							</IxButton>
							<div className='paginationWrapper'>
								<span className='roundLabel'>Round:</span>
								<IxPagination
									count={leagueData.fixture.length}
									onPageSelected={(num) => {
										setUpdatedMatches([])
										setPaginationContent(
											getMatchesForRound(leagueData.fixture, num.detail + 1)
										)
									}}
								/>
							</div>
						</div>
					</div>
				)
			) : (
				<div>League Not Found.</div>
			)}
		</div>
	)
}

export default League
