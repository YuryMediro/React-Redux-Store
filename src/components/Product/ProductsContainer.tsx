import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getProducts } from '../../features/products/productsSlice'
import { Products } from './Products'

export const ProductsContainer = () => {
	const dispatch = useAppDispatch()
	const { productsList } = useAppSelector(state => state.products)
	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch])

	return <Products products={productsList} title={'Trending'}  />
}
