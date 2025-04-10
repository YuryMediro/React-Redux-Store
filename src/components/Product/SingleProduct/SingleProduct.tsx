import s from './SingleProduct.module.css'
import { ProductsType } from '../../../features/products/productsSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../../../shared/Button/Button'
import { ImageGalleryModal } from '../../../widgets/ImageGalleryModal/ImageGalleryModal'

interface SingleProductProps {
	product: ProductsType
}

export const SingleProduct = ({ product }: SingleProductProps) => {
	const SIZES = [4, 4.5, 5]

	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [currentSize, setCurrentSize] = useState<number | null>(null)
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)

	const openGallery = () => {
		setIsGalleryOpen(true)
	}
	const closeGallery = () => {
		setIsGalleryOpen(false)
	}

	return (
		<section className={s.product}>
			<div className={s.imagesContainer}>
				<img
					className={s.current}
					src={product.images[currentImageIndex]}
					alt='mainImg'
					onClick={openGallery}
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
							<img className={s.additionalImages} src={image} />
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
							disabled={!currentSize}
							title={!currentSize ? 'Please select a size' : ''}
							className={s.button}
						>
							Add to cart
						</Button>
						<button className={s.favoritesButton}>Add to favorites</button>
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
	)
}
