import { Route, Routes } from 'react-router-dom'
import { ProductPage } from '../pages/ProductPage/ProductPage'
import { HomePage } from '../pages/HomePage/HomePage'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route index path='/' element={<HomePage />} />
			<Route path='/products/:id' element={<ProductPage />} />
		</Routes>
	)
}
