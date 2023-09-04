import React from 'react'
import { IxTooltip, IxIcon } from '@siemens/ix-react'
import '../styles/components/leaguetitle.css'
const LeagueTitle = ({ league }) => {
	return (
		<div className='titleWrapper'>
			<div className='leagueWithIcon'>
				<h2 className='leagueTitle'>{league.title}</h2>
				<IxIcon
					name='about'
					size='24'
					className='leagueInfoIcon'
					id='league-info-icon'
				></IxIcon>
				<IxTooltip for="[id='league-info-icon']">
					<div className='tooltipWrapper'>
						<div>Win Point: {league.winPoint}</div>
						<div>Draw Point: {league.drawPoint}</div>
						<div>Lose Point: {league.losePoint}</div>
						<div>Rematch: {league.rematch ? 'Yes' : 'No'}</div>
						<div>Created Date: {league.createdAt}</div>
					</div>
				</IxTooltip>
			</div>
		</div>
	)
}

export default LeagueTitle
