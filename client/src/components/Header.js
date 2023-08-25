import React from 'react'
import { IxContentHeader } from '@siemens/ix-react'
import '../styles/components/header.css'

const Header = ({ title }) => {
	return (
		<div className='headerContainer'>
			<IxContentHeader variant='Primary' header-title={title}></IxContentHeader>
			<hr className='headerDivider' />
		</div>
	)
}

export default Header
