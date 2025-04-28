import { addCart } from '@features/cart/cartSlice'
import { addToFavorites } from '@features/favorites/favoritesSlice'
import { useState } from 'react'
import { useVisible } from './hooks'
import { useAppDispatch, useAppSelector } from './redux'
import { ProductsType } from '@features/products/productsSlice'

export const useSingleProductLogic = (product: ProductsType) => {
	const SIZES = [4, 4.5, 5]
	const dispatch = useAppDispatch()
	const { currentUser } = useAppSelector(state => state.user)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [currentSize, setCurrentSize] = useState<number | undefined>(undefined)
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const authModal = useVisible(false)

	const [notification, setNotification] = useState('')

	const handleAddToCart = () => {
		if (!currentUser) {
			authModal.handleOnClick()
			return
		}
		if (currentSize === undefined) {
			return
		}
		dispatch(
			addCart({
				...product,
				size: currentSize,
				quantity: 1,
			})
		)
		showNotification('Item added to cart')
	}

	const handleAuthSuccess = () => {
		authModal.handleOnClick()

		if (currentSize) {
			dispatch(
				addCart({
					...product,
					size: currentSize,
					quantity: 1,
				})
			)
		}
	}

	const handleAddToFavorites = () => {
		if (!currentUser) {
			authModal.handleOnClick()
			return
		}
		if (currentSize === undefined) {
			return
		}
		dispatch(
			addToFavorites({
				...product,
				size: currentSize,
			})
		)
		showNotification('Item added to favorites')
	}

	const showNotification = (message: string) => {
		setNotification(message)
		setTimeout(() => setNotification(''), 2000)
	}
	return {
		currentImageIndex,
		currentSize,
		isGalleryOpen,
		notification,
		authModal,
		SIZES,
		setCurrentImageIndex,
		setCurrentSize,
		setIsGalleryOpen,
		handleAddToCart,
		handleAddToFavorites,
		handleAuthSuccess,
		showNotification,
	}
}
