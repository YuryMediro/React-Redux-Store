import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getCategories } from '../../features/categories/categoriesSlice'
import { Categories } from './Categories'

export const CategoriesContainer = () => {
	const dispatch = useAppDispatch()
	const { list } = useAppSelector(state => state.categories)
	useEffect(() => {
		dispatch(getCategories())
	}, [dispatch])
	return <Categories categories={list} title={'Worth seeing'} />
}
