import { useEffect } from 'react'
import { SingleCategory } from './SingleCategory'
import { useParams } from 'react-router-dom'
import { getProductsByCategory } from '@features/products/productsSlice'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

interface SingleCategoryContainerProps {}

export const SingleCategoryContainer = ({}: SingleCategoryContainerProps) => {
	const dispatch = useAppDispatch()
	const { productsList } = useAppSelector(state => state.products)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		if (id) {
			dispatch(getProductsByCategory(Number(id)))
		}
	}, [dispatch, id])

	return <SingleCategory products={productsList} />
}
