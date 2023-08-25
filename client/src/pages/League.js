import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import '../styles/pages/league.css'
const League = () => {
	const { id } = useParams()
	return (
		<div style={{ width: '100%' }}>
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
						<td>Team 1</td>
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
		</div>
	)
}

export default League
