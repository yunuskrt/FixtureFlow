import React, { useState, useRef } from 'react'
import '../styles/components/matchinput.css'
const MatchInput = ({ match, handleInputChange }) => {
	const homeScoreRef = useRef(null)
	const awayScoreRef = useRef(null)
	const [matchData, setMatchData] = useState(match)
	const [inputValidation, setInputValidation] = useState({
		show: false,
		message: '',
	})
	const handleInputValidation = () => {
		const homeScoreValue = homeScoreRef.current.value
		const awayScoreValue = awayScoreRef.current.value

		if (homeScoreValue === '' && awayScoreValue === '') {
			setInputValidation({ show: true, message: 'Fill both input fields.' })
		} else if (homeScoreValue === '') {
			setInputValidation({ show: true, message: 'Fill home score field.' })
		} else if (awayScoreValue === '') {
			setInputValidation({ show: true, message: 'Fill away score field.' })
		} else if (homeScoreValue.includes('.') || awayScoreValue.includes('.')) {
			setInputValidation({
				show: true,
				message: 'Score fields must be integer.',
			})
		} else if (homeScoreValue.includes('-') || awayScoreValue.includes('-')) {
			setInputValidation({
				show: true,
				message: 'Score fields can not be less than zero.',
			})
		} else {
			setInputValidation({ show: false, message: '' })
		}
	}
	return (
		<div className='matchWrapper'>
			<div className='matchContainer'>
				<h5 className='teamNameLabel'>{match.homeTeam}</h5>
				<input
					type='number'
					className='teamScoreInput'
					ref={homeScoreRef}
					defaultValue={match.homeScore === null ? '' : match.homeScore}
					onChange={() => {
						setMatchData({
							...matchData,
							homeScore: homeScoreRef.current.value,
						})
						handleInputChange({
							...matchData,
							homeScore: homeScoreRef.current.value,
						})
						handleInputValidation()
					}}
					min={0}
				/>
				-
				<input
					type='number'
					className='teamScoreInput'
					ref={awayScoreRef}
					defaultValue={match.awayScore === null ? '' : match.awayScore}
					onChange={() => {
						setMatchData({
							...matchData,
							awayScore: awayScoreRef.current.value,
						})
						handleInputChange({
							...matchData,
							awayScore: awayScoreRef.current.value,
						})
						handleInputValidation()
					}}
					min={0}
				/>
				<h5 className='teamNameLabel'>{match.awayTeam}</h5>
			</div>
			{inputValidation.show && (
				<div className='invalidInput'>{inputValidation.message}</div>
			)}
		</div>
	)
}

export default MatchInput
