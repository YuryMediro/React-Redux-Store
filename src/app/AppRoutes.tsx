import { Route, Routes } from 'react-router-dom'
import { ProductPage } from '../pages/ProductPage/ProductPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { UserProfilePage } from '../pages/UserProfilePage/UserProfilePage'
import { SingleCategoryPage } from '../pages/SingleCategoryPage/SingleCategoryPage'
import { ShoppingCartPage } from '../pages/ShoppingCartPage/ShoppingCartPage'
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path='/products/:id' element={<ProductPage />} />
			<Route path='/profile' element={<UserProfilePage />} />
			<Route path='/category/:id' element={<SingleCategoryPage />} />
			<Route path='/shoppingCart' element={<ShoppingCartPage />} />
			<Route path='/favorites' element={<FavoritesPage />} />
		</Routes>
	)
}
