import React from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import League from './pages/League'
import PageNotFound from './pages/404'
import '@siemens/ix-icons/dist/css/ix-icons.css'
import '@siemens/ix/dist/siemens-ix/siemens-ix.css'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom'
function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/league/:id' element={<League />} />
					<Route path='/404' element={<PageNotFound />} />
					<Route path='*' element={<Navigate to='/404' />} />
				</Routes>
			</Layout>
		</Router>
	)
}

export default App
