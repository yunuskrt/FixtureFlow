import React, { useRef } from 'react'
import { IxEventListItem, IxIcon, showModal } from '@siemens/ix-react'
import CustomModal from './CustomModal'
import '../styles/components/teamlistitem.css'
const TeamListItem = ({ team, removeItem, editItem }) => {
	const editTeamRef = useRef()
	async function showEditTeamModal() {
		await showModal({
			title: 'edit team name',
			content: (
				<CustomModal
					title='Edit Team'
					handleSubmit={() => {
						editItem(team, editTeamRef.current.value)
					}}
				>
					<input
						className='form-control customModalContent'
						defaultValue={team}
						placeholder='Enter team name'
						type='text'
						ref={editTeamRef}
					/>
				</CustomModal>
			),
		})
	}
	async function showRemoveTeamModal() {
		await showModal({
			title: 'edit team name',
			content: (
				<CustomModal
					title='Remove Team'
					handleSubmit={() => {
						removeItem(team)
					}}
				>
					<p className='customModalContent'>Are you sure deleting - {team}?</p>
				</CustomModal>
			),
		})
	}

	return (
		<IxEventListItem color='color-primary'>
			<div>{team}</div>
			<div className='iconWrapper'>
				<IxIcon
					name='pen'
					size='32'
					onClick={() => {
						showEditTeamModal()
					}}
				></IxIcon>
				<IxIcon
					name='minus'
					size='32'
					onClick={() => {
						showRemoveTeamModal()
					}}
				></IxIcon>
			</div>
		</IxEventListItem>
	)
}

export default TeamListItem
