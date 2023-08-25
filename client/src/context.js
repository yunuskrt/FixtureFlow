import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [message, setMessage] = useState({
		type: 'info',
		text: '',
		show: false,
	})
	const alertMessage = (type, text) => {
		setMessage({ type: type, text: text, show: true })
	}
	const clearMessage = () => {
		setMessage({ type: 'info', text: '', show: false })
	}
	return (
		<AppContext.Provider value={{ message, alertMessage, clearMessage }}>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
