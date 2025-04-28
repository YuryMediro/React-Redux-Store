import { addCart } from '@features/cart/cartSlice'
import {
	FavoritesItem,
	removeFromFavorites,
	clearFavorites,
} from '@features/favorites/favoritesSlice'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'

export const useFavoritesLogic = () => {
	const dispatch = useAppDispatch()
	const { items } = useAppSelector(state => state.favorites)
	const cartItems = useAppSelector(state => state.cart.items)

	const [notification, setNotification] = useState('')

	const isInCart = (item: FavoritesItem) => {
		return cartItems.some(
			cartItem => cartItem.id === item.id && cartItem.size === item.size
		)
	}
	const handleRemove = (id: number, size: number) => {
		dispatch(removeFromFavorites({ id, size }))
		showNotification('Item removed from favorites')
	}
	const handleClearFavorites = () => {
		dispatch(clearFavorites())
		showNotification('All items have been removed from favorites')
	}
	const handleAddToCart = (item: FavoritesItem, quantity: number) => {
		dispatch(
			addCart({
				...item,
				size: item.size,
				quantity: quantity,
			})
		)
		showNotification('Item added to cart')
	}
    const showNotification = (message: string) => {
		setNotification(message)
		setTimeout(() => setNotification(''), 2000)
	}

	return {
		items,
		handleRemove,
		isInCart,
		handleClearFavorites,
		handleAddToCart,
		notification,
	}
}
