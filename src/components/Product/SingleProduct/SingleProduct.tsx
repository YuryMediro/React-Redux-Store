import s from './SingleProduct.module.css'
import { ProductsType } from '../../../features/products/productsSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../../../shared/Button/Button'
import { ImageGalleryModal } from '../../../widgets/ImageGalleryModal/ImageGalleryModal'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { createPortal } from 'react-dom'
import { UserRegistration } from '../../../processes/Form/UserForm'
import { useFormModal } from '../../../hooks/useFormModal'
import { addCart } from '../../../features/cart/cartSlice'
import noImage from '../../../assets/noImage.webp'
import { addToFavorites } from '../../../features/favorites/favoritesSlice'

interface SingleProductProps {
	product: ProductsType
}

export const SingleProduct = ({ product }: SingleProductProps) => {
	const SIZES = [4, 4.5, 5]
	const dispatch = useAppDispatch()
	const { currentUser } = useAppSelector(state => state.user)

	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [currentSize, setCurrentSize] = useState<number | undefined>(undefined)
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const authModal = useFormModal(false)

	// Состояние для уведомления
	const [notification, setNotification] = useState('')

	const openGallery = () => {
		setIsGalleryOpen(true)
	}
	const closeGallery = () => {
		setIsGalleryOpen(false)
	}

	const handleAddCart = () => {
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
		setNotification('Item added to cart')
		setTimeout(() => {
			setNotification('')
		}, 2000)
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
		setNotification('Item added to favorites')
		setTimeout(() => {
			setNotification('')
		}, 2000)
	}

	return (
		<>
			{notification && (
				<div className={s.notification}>
					<span>{notification}</span>
				</div>
			)}
			<section className={s.product}>
				<div className={s.imagesContainer}>
					<img
						className={s.current}
						src={product.images[currentImageIndex]}
						alt='mainImg'
						onClick={openGallery}
						onError={e => {
							const target = e.target as HTMLImageElement
							target.src = noImage
						}}
					/>
					<div className={s.additionalImagesContainer}>
						{product.images.map((image, index) => (
							<div
								key={index}
								className={`${s.thumbnailWrapper} ${
									index === currentImageIndex ? s.activeThumbnail : ''
								}`}
								onClick={() => setCurrentImageIndex(index)}
							>
								<img
									className={s.additionalImages}
									src={image}
									onError={e => {
										const target = e.target as HTMLImageElement
										target.src = noImage
									}}
								/>
							</div>
						))}
					</div>
				</div>

				<div className={s.info}>
					<h1 className={s.title}>{product.title}</h1>
					<div className={s.price}>{product.price}$</div>
					<div className={s.color}>
						<span>Color:</span> Basic
					</div>
					<div className={s.sizesContainer}>
						<span>Sizes:</span>
						<div className={s.sizesList}>
							{SIZES.map(size => (
								<div
									onClick={() => setCurrentSize(size)}
									key={size}
									className={`${s.size} ${
										currentSize === size ? s.selected : ''
									}`}
								>
									{size}
								</div>
							))}
						</div>
					</div>
					<p className={s.description}>{product.description}</p>
					<div className={s.container}>
						<div className={s.buttonContainer}>
							<Button
								onClick={handleAddCart}
								disabled={!currentSize}
								title={!currentSize ? 'Please select a size' : ''}
								className={s.button}
							>
								Add to cart
							</Button>
							<Button
								onClick={handleAddToFavorites}
								className={s.button}
								disabled={!currentSize}
								title={!currentSize ? 'Please select a size' : ''}
							>
								Add to favorites
							</Button>
						</div>
					</div>
					<div className={s.footer}>
						<p className={s.purchased}>
							{Math.floor(Math.random() * 20 + 1)} people purchased
						</p>
						<Link to={'/'} className={s.find}>
							<u>Find in a store</u>
						</Link>
					</div>
				</div>
				{isGalleryOpen && (
					<ImageGalleryModal
						onClose={closeGallery}
						images={product.images}
						initialIndex={currentImageIndex}
					/>
				)}
			</section>
			{authModal &&
				createPortal(
					<UserRegistration
						visible={authModal.visible}
						setVisible={authModal.handleOnClick}
						onSuccess={handleAuthSuccess}
					/>,
					document.body
				)}
		</>
	)
}
