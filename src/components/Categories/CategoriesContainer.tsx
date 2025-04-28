import { useEffect } from 'react'
import { Categories } from './Categories'
import { getCategories } from '@features/categories/categoriesSlice'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

export const CategoriesContainer = () => {
	const dispatch = useAppDispatch()
	const { list } = useAppSelector(state => state.categories)
	useEffect(() => {
		dispatch(getCategories())
	}, [dispatch])
	return <Categories categories={list} title={'Worth seeing'} />
}
