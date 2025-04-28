import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { getCategories } from '@features/categories/categoriesSlice'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

export const SidebarContainer = () => {
	const dispatch = useAppDispatch()
	const { list } = useAppSelector(state => state.categories)
	useEffect(() => {
		dispatch(getCategories())
	}, [])

	return <Sidebar categories={list} />
}
