import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home/Home'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
		</Routes>
	)
}
