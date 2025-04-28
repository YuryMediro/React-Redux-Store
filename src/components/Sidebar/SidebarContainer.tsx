import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Sidebar } from './Sidebar'
import { getCategories } from '../../features/categories/categoriesSlice'

export const SidebarContainer = () => {
	const dispatch = useAppDispatch()
	const { list } = useAppSelector(state => state.categories)
	useEffect(() => {
		dispatch(getCategories())
	}, [])

	return <Sidebar categories={list} />
}
