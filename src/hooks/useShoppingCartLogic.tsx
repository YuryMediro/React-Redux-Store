import {
	removeFromCart,
	updateQuantity,
	clearCart,
} from '@features/cart/cartSlice'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from './redux'

export const useShoppingCartLogic = () => {
	const { items } = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()

	const [notification, setNotification] = useState('')

	const handleRemove = (id: number, size: number) => {
		dispatch(removeFromCart({ id, size }))
		showNotification('Item removed from cart')
	}

	const handleQuantityChange = (id: number, size: number, quantity: number) => {
		if (quantity < 1) return
		dispatch(updateQuantity({ id, size, quantity }))
	}

	const handleClearCart = () => {
		dispatch(clearCart())
		showNotification('All items have been removed from cart')
	}

	const showNotification = (message: string) => {
		setNotification(message)
		setTimeout(() => setNotification(''), 2000)
	}

	const totalPrice = items.reduce((sum, item) => {
		return sum + item.price * item.quantity
	}, 0)

	return {
		items,
		handleRemove,
		handleQuantityChange,
		handleClearCart,
		notification,
		totalPrice,
	}
}
