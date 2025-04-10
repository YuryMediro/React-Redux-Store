import { useState, useRef, useEffect } from 'react'
import s from './ImageGalleryModal.module.css'

interface ImageGalleryModalProps {
	images: string[]
	initialIndex: number
	onClose: () => void
}

export const ImageGalleryModal = ({
	images,
	initialIndex,
	onClose,
}: ImageGalleryModalProps) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const imageRefs = useRef<(HTMLImageElement | null)[]>([])

	// Предзагрузка изображений
	useEffect(() => {
		images.forEach(img => {
			const imgObj = new Image()
			imgObj.src = img
		})
	}, [images])

	const handleImageChange = (newIndex: number) => {
		if (newIndex === currentIndex || isTransitioning) return

		setIsTransitioning(true)

		// Ждём когда новое изображение загрузится
		const img = new Image()
		img.src = images[newIndex]
		img.onload = () => {
			setCurrentIndex(newIndex)
			setIsTransitioning(false)
		}
	}

	const navigate = (direction: 'prev' | 'next') => {
		const newIndex =
			direction === 'next'
				? (currentIndex + 1) % images.length
				: (currentIndex - 1 + images.length) % images.length
		handleImageChange(newIndex)
	}

	return (
		<div className={s.overlay} onClick={onClose}>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				<button className={s.closeButton} onClick={onClose}>
					&times;
				</button>

				<div className={s.imageContainer}>
					{/* Основное изображение с плавным переходом */}
					<div className={s.imageWrapper}>
						{images.map((img, index) => (
							<img
								key={index}
								ref={el => {
									imageRefs.current[index] = el
								}}
								src={img}
								alt={`Gallery view ${index + 1}`}
								className={`${s.mainImage} ${
									index === currentIndex ? s.active : s.inactive
								}`}
								loading='eager'
							/>
						))}
					</div>
				</div>

				<div className={s.controls}>
					<button
						className={s.navButton}
						onClick={() => navigate('prev')}
						disabled={isTransitioning}
					>
						&lt;
					</button>
					<div className={s.thumbnails}>
						{images.map((image, index) => (
							<div
								key={index}
								className={`${s.thumbnail} ${
									index === currentIndex ? s.activeThumb : ''
								}`}
								onClick={() => handleImageChange(index)}
							>
								<img
									src={image}
									alt={`Thumbnail ${index + 1}`}
									loading='lazy'
								/>
							</div>
						))}
					</div>
					<button
						className={s.navButton}
						onClick={() => navigate('next')}
						disabled={isTransitioning}
					>
						&gt;
					</button>
				</div>
			</div>
		</div>
	)
}
