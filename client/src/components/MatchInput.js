import React, { useRef } from 'react'
import '../styles/components/matchinput.css'
const MatchInput = ({ match }) => {
	const homeScoreRef = useRef()
	const awayScoreRef = useRef()
	return (
		<div className='matchContainer'>
			<h5 className='teamNameLabel'>{match.homeTeam}</h5>
			<input type='number' className='teamScoreInput' ref={homeScoreRef} />
			-
			<input type='number' className='teamScoreInput' ref={awayScoreRef} />
			<h5 className='teamNameLabel'>{match.awayTeam}</h5>
		</div>
	)
}

export default MatchInput
