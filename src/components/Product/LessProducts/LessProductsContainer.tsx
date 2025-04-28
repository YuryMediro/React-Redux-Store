import { useEffect } from 'react'
import { LessProducts } from './LessProducts'
import { getProducts } from '@features/products/productsSlice'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

export const LessProductsContainer = () => {
	const dispatch = useAppDispatch()
	const { productsList } = useAppSelector(state => state.products)

	const filteredProducts = productsList.filter(product => product.price < 150)

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	return <LessProducts title={'Less than 150$'} products={filteredProducts} />
}
