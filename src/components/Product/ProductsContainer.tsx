import { useEffect } from 'react'
import { Products } from './Products'
import { getProducts } from '@features/products/productsSlice'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

export const ProductsContainer = () => {
	const dispatch = useAppDispatch()
	const { productsList } = useAppSelector(state => state.products)
	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch])

	return <Products products={productsList} title={'Trending'} />
}
