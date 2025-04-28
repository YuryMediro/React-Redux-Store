import s from './SingleProduct.module.css'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import noImage from '@assets/noImage.webp'
import { ProductsType } from '@features/products/productsSlice'
import { UserRegistration } from '@processes/Form/UserForm'
import { Button } from '@shared/Button/Button'
import { ImageGalleryModal } from '@widgets/ImageGalleryModal/ImageGalleryModal'
import { useSingleProductLogic } from '@hooks/useSingleProductLogic'
import { Notification } from '@widgets/Notification/Notification'

interface SingleProductProps {
	product: ProductsType
}

export const SingleProduct = ({ product }: SingleProductProps) => {
	const {
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
	} = useSingleProductLogic(product)
	return (
		<>
			<Notification message={notification} />
			<section className={s.product}>
				<div className={s.imagesContainer}>
					<img
						className={s.current}
						src={product.images[currentImageIndex]}
						alt='mainImg'
						onClick={() => setIsGalleryOpen(true)}
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
								onClick={handleAddToCart}
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
						onClose={() => setIsGalleryOpen(false)}
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
