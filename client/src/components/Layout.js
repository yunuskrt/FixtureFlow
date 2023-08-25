import React, { useEffect } from 'react'
import {
	IxContentHeader,
	IxExpandingSearch,
	IxMessageBar,
} from '@siemens/ix-react'
import { useGlobalContext } from '../context'
import '../styles/components/layout.css'

const Layout = ({ children }) => {
	const { message, clearMessage } = useGlobalContext()
	useEffect(() => {
		if (message.show) {
			// After 2 seconds, hide the component
			const timer = setTimeout(() => {
				clearMessage()
			}, 2500)

			return () => clearTimeout(timer) // Clear the timeout if the component is unmounted before 2 seconds
		}
	}, [message])

	return (
		<div className='wrapper'>
			{message.show && (
				<IxMessageBar type={message.type} onClosedChange={() => clearMessage()}>
					{message.text}
				</IxMessageBar>
			)}
			<IxContentHeader header-title='FixtureFlow' className='header'>
				<IxExpandingSearch placeholder='Search...'></IxExpandingSearch>
			</IxContentHeader>

			<div className='content'>{children}</div>
		</div>
	)
}

export default Layout
