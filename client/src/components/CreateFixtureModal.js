import React, { useRef, useState } from 'react'
import { IxToggle } from '@siemens/ix-react'
import CustomModal from './CustomModal'
import axios from 'axios'
import '../styles/components/createfixtureform.css'

const CreateFixtureModal = ({ teams }) => {
	const leagueRef = useRef()
	const winRef = useRef()
	const drawRef = useRef()
	const loseRef = useRef()
	const [rematch, setRematch] = useState(false)

	const handleFixtureValidation = () => {
		const leagueName = leagueRef.current.value
		const winPoint = parseInt(winRef.current.value)
		const drawPoint = parseInt(drawRef.current.value)
		const losePoint = parseInt(loseRef.current.value)

		if (leagueName === '') {
			alert('League name cannot be empty.')
		} else if (leagueName.length < 3 || leagueName.length > 12) {
			alert('League name must be between 3 and 12 characters.')
		} else if (losePoint > winPoint) {
			alert(
				'Lose Point cannot be greater than Win Point. Please set the points again.'
			)
		} else if (drawPoint > winPoint) {
			alert(
				'Draw Point cannot be greater than Win Point. Please set the points again.'
			)
		} else if (losePoint > drawPoint) {
			alert(
				'Lose Point cannot be greater than Draw point. Please set the points again.'
			)
		} else {
			// Send API request
			const data = {
				name: leagueName,
				winPoint: winPoint,
				drawPoint: drawPoint,
				losePoint: losePoint,
				rematch: rematch,
				teams: teams,
			}
			const league = axios
				.post('http://localhost:5000/api/leagues', data, {
					'Content-Type': 'application/json',
				})
				.then((res) => console.log(res.data))
		}
	}
	return (
		<CustomModal title='Create Fixture' handleSubmit={handleFixtureValidation}>
			<div className='fixtureFormWrapper'>
				<label htmlFor='leagueName' className='form-label'>
					League name *
				</label>
				<input
					type='text'
					className='form-control'
					id='leagueName'
					placeholder='Enter league name'
					ref={leagueRef}
				/>

				<div className='pointsWrapper'>
					<div className='pointInput'>
						<label htmlFor='winPoint' className='form-label pointLabel'>
							Win *
						</label>
						<input
							type='number'
							className='form-control'
							id='winPoint'
							min={1}
							max={10}
							defaultValue={3}
							ref={winRef}
						/>
					</div>
					<div className='pointInput'>
						<label htmlFor='drawPoint' className='form-label pointLabel'>
							Draw *
						</label>
						<input
							type='number'
							className='form-control'
							id='drawPoint'
							min={0}
							max={10}
							defaultValue={1}
							ref={drawRef}
						/>
					</div>
					<div className='pointInput'>
						<label htmlFor='losePoint' className='form-label pointLabel'>
							Lose *
						</label>
						<input
							type='number'
							className='form-control'
							id='losePoint'
							min={0}
							max={10}
							defaultValue={0}
							ref={loseRef}
						/>
					</div>
				</div>
				<IxToggle
					text-off='No Rematch'
					text-on='Rematch'
					checked={rematch}
					onCheckedChange={() => setRematch(!rematch)}
				/>
			</div>
		</CustomModal>
	)
}

export default CreateFixtureModal
