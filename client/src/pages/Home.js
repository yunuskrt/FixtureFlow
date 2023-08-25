import React, { useState, useRef, useEffect } from 'react'
import { IxButton, IxEmptyState } from '@siemens/ix-react'
import '../styles/pages/home.css'
import TeamListItem from '../components/TeamListItem'
import { useGlobalContext } from '../context'

const Home = () => {
	const { alertMessage } = useGlobalContext()
	const [teams, setTeams] = useState([])
	const teamRef = useRef()

	const insertTeam = () => {
		const newTeam = teamRef.current.value
		if (newTeam === '') {
			alertMessage('danger', 'Cannot insert an empty value.')
		} else if (teams.includes(newTeam)) {
			alertMessage(
				'danger',
				`Cannot insert ${newTeam} because it exists. Try another name.`
			)
		} else if (teams.length >= 10) {
			alertMessage(
				'danger',
				`Cannot insert ${newTeam} because maximum number of teams reached.`
			)
		} else if (newTeam.length > 10 || newTeam.length < 3) {
			alertMessage('danger', 'Team name must be between 3 and 10 characters.')
		} else {
			setTeams([...teams, newTeam])
			teamRef.current.value = ''
			alertMessage('info', `${newTeam} inserted successfully.`)
		}
	}
	const removeTeam = (teamName) => {
		var newTeams = teams.filter(function (team) {
			return team !== teamName
		})
		setTeams(newTeams)
		alertMessage('info', `${teamName} removed successfully.`)
	}
	const editTeam = (oldTeamName, teamName) => {
		if (teamName === '') {
			alertMessage('danger', 'Cannot insert an empty value.')
		} else if (teams.includes(teamName)) {
			alertMessage(
				'danger',
				`Cannot insert ${teamName} because it exists. Try another name.`
			)
		} else if (teamName.length > 10 || teamName.length < 3) {
			alertMessage('danger', 'Team name must be between 3 and 10 characters.')
		} else {
			setTeams((prevTeams) => {
				const index = prevTeams.indexOf(oldTeamName)
				if (index !== -1) {
					const newTeams = [...prevTeams]
					newTeams[index] = teamName
					return newTeams
				}
				return prevTeams
			})
			alertMessage('info', `Team name ${oldTeamName} changed to ${teamName}.`)
		}
	}
	const handleEnter = (event) => {
		if (event.key === 'Enter') {
			insertTeam()
		}
	}

	return (
		<div className='homeWrapper'>
			<input
				className='teamInput'
				placeholder='Enter team name'
				type='text'
				ref={teamRef}
				onKeyUp={handleEnter}
			/>
			<IxButton className='addTeam' onClick={insertTeam}>
				Add Team
			</IxButton>
			{teams.length === 0 ? (
				<IxEmptyState
					header='No Teams in League'
					subHeader='Add a team first'
					icon='add'
					className='emptyState'
				></IxEmptyState>
			) : (
				<div>
					{teams.map((team, index) => {
						return (
							<TeamListItem
								team={team}
								key={index}
								removeItem={removeTeam}
								editItem={editTeam}
							/>
						)
					})}
					<div className='fixtureButton'>
						{teams.length >= 2 ? (
							<IxButton class='m-1' outline variant='Primary'>
								Create Fixture
							</IxButton>
						) : (
							<IxButton class='m-1' disabled outline variant='Primary'>
								Create Fixture
							</IxButton>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Home
