// components/ImageGalleryModal/ImageGalleryModal.tsx
import { useState } from 'react'
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

	const navigate = (direction: 'prev' | 'next') => {
		if (isTransitioning) return // Если анимация уже идёт — ничего не делаем

		setIsTransitioning(true) // Запускаем анимацию
		setTimeout(() => {
			setCurrentIndex(prev => {
				if (direction === 'next') {
					return (prev + 1) % images.length // Переход к следующему (по кругу)
				} else {
					return (prev - 1 + images.length) % images.length // Переход к предыдущему (по кругу)
				}
			})
			setIsTransitioning(false) // Завершаем анимацию
		}, 300)
	}

	const handleThumbnailClick = (index: number) => {
		if (index === currentIndex || isTransitioning) return // Если уже выбрано или идёт анимация — пропускаем

		setIsTransitioning(true) // Запускаем анимацию
		setTimeout(() => {
			setCurrentIndex(index) // Устанавливаем новый индекс
			setIsTransitioning(false) // Завершаем анимацию
		}, 300)
	}

	return (
		<div className={s.overlay} onClick={onClose}>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				<button className={s.closeButton} onClick={onClose}>
					&times;
				</button>

				<div
					className={`${s.mainImage} ${isTransitioning ? s.fadeOut : s.fadeIn}`}
				>
					<img
						src={images[currentIndex]}
						alt={`Gallery view ${currentIndex + 1}`}
					/>
				</div>

				<div className={s.controls}>
					<button className={s.navButton} onClick={() => navigate('prev')}>
						&lt;
					</button>
					<div className={s.thumbnails}>
						{images.map((image, index) => (
							<div
								key={index}
								className={`${s.thumbnail} ${
									index === currentIndex ? s.active : ''
								}`}
								onClick={() => handleThumbnailClick(index)}
							>
								<img src={image} alt={`Thumbnail ${index + 1}`} />
							</div>
						))}
					</div>
					<button className={s.navButton} onClick={() => navigate('next')}>
						&gt;
					</button>
				</div>
			</div>
		</div>
	)
}
