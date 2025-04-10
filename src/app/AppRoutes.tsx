import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home/Home'
import { ProductPage } from '../pages/ProductPage/ProductPage'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
			<Route path='/products/:id' element={<ProductPage />} />
		</Routes>
	)
}
