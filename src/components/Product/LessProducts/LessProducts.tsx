import { useState } from 'react'
import s from './LessProducts.module.css'
import noImage from '@assets/noImage.webp'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { NavLink } from 'react-router-dom'
import { ProductsType } from '@features/products/productsSlice'
import { Button } from '@shared/Button/Button'

interface LessProductsProps {
	products: ProductsType[]
	title: string
}

export const LessProducts = ({ title, products }: LessProductsProps) => {
	const [showAllProducts, setShowAllProducts] = useState(false)

	if (products.length === 0) {
		return (
			<section className={s.products}>
				{title && <h2 className={s.title}>{title}</h2>}
				<div className={s.emptyMessage}>No products available</div>
			</section>
		)
	}

	return (
		<section className={s.products}>
			{title && <h2 className={s.title}>{title}</h2>}

			{!showAllProducts ? (
				<div className={s.cardContainer}>
					{products.slice(0, 5).map(product => (
						<NavLink
							className={s.card}
							to={`/products/${product.id}`}
							key={product.id}
						>
							{product.images && product.images.length > 0 && (
								<img
									src={product.images?.[0] || noImage}
									alt={product.title}
									className={s.image}
									onError={e => {
										const target = e.target as HTMLImageElement
										target.src = noImage
									}}
								/>
							)}
							<div className={s.productsInfo}>
								<div className={s.description}>
									<div className={s.productsTitle}>{product.title}</div>
									<div className={s.productsCat}>{product.category.name}</div>
								</div>
								<div className={s.info}>
									<div className={s.prices}>
										<div className={s.price}>{product.price}$</div>
										<div className={s.oldPrice}>
											{Math.floor(product.price * 0.8)}$
										</div>
									</div>
									<div className={s.purchased}>
										{Math.floor(Math.random() * 20 + 1)} purchased
									</div>
								</div>
							</div>
						</NavLink>
					))}
				</div>
			) : (
				<Swiper
					modules={[Navigation]}
					slidesPerView={5}
					navigation
					loop
					className={s.swiper}
				>
					{products.map(product => (
						<SwiperSlide key={product.id}>
							<NavLink
								className={s.card}
								to={`/products/${product.id}`}
								key={product.id}
							>
								{product.images && product.images.length > 0 && (
									<img
										src={product.images?.[0] || noImage}
										alt={product.title}
										className={s.image}
										onError={e => {
											const target = e.target as HTMLImageElement
											target.src = noImage
										}}
									/>
								)}
								<div className={s.productsInfo}>
									<div className={s.description}>
										<div className={s.productsTitle}>{product.title}</div>
										<div className={s.productsCat}>{product.category.name}</div>
									</div>
									<div className={s.info}>
										<div className={s.prices}>
											<div className={s.price}>{product.price}$</div>
											<div className={s.oldPrice}>
												{Math.floor(product.price * 0.8)}$
											</div>
										</div>
										<div className={s.purchased}>
											{Math.floor(Math.random() * 20 + 1)} purchased
										</div>
									</div>
								</div>
							</NavLink>
						</SwiperSlide>
					))}
				</Swiper>
			)}
			{!showAllProducts ? (
				<div className={s.cardContainerMobile}>
					{products.slice(0, 3).map(product => (
						<NavLink
							className={s.card}
							to={`/products/${product.id}`}
							key={product.id}
						>
							{product.images && product.images.length > 0 && (
								<img
									src={product.images?.[0] || noImage}
									alt={product.title}
									className={s.image}
									onError={e => {
										const target = e.target as HTMLImageElement
										target.src = noImage
									}}
								/>
							)}
							<div className={s.productsInfo}>
								<div className={s.description}>
									<div className={s.productsTitle}>{product.title}</div>
									<div className={s.productsCat}>{product.category.name}</div>
								</div>
								<div className={s.info}>
									<div className={s.prices}>
										<div className={s.price}>{product.price}$</div>
										<div className={s.oldPrice}>
											{Math.floor(product.price * 0.8)}$
										</div>
									</div>
									<div className={s.purchased}>
										{Math.floor(Math.random() * 20 + 1)} purchased
									</div>
								</div>
							</div>
						</NavLink>
					))}
				</div>
			) : (
				<Swiper
					modules={[Navigation]}
					slidesPerView={3}
					navigation
					loop
					className={s.swiperMobile}
				>
					{products.map(product => (
						<SwiperSlide key={product.id}>
							<NavLink
								className={s.card}
								to={`/products/${product.id}`}
								key={product.id}
							>
								{product.images && product.images.length > 0 && (
									<img
										src={product.images?.[0] || noImage}
										alt={product.title}
										className={s.image}
										onError={e => {
											const target = e.target as HTMLImageElement
											target.src = noImage
										}}
									/>
								)}
								<div className={s.productsInfo}>
									<div className={s.description}>
										<div className={s.productsTitle}>{product.title}</div>
										<div className={s.productsCat}>{product.category.name}</div>
									</div>
									<div className={s.info}>
										<div className={s.prices}>
											<div className={s.price}>{product.price}$</div>
											<div className={s.oldPrice}>
												{Math.floor(product.price * 0.8)}$
											</div>
										</div>
										<div className={s.purchased}>
											{Math.floor(Math.random() * 20 + 1)} purchased
										</div>
									</div>
								</div>
							</NavLink>
						</SwiperSlide>
					))}
				</Swiper>
			)}

			<Button
				onClick={() => setShowAllProducts(!showAllProducts)}
				className={s.button}
			>
				{showAllProducts ? 'Show less' : 'Show more'}
			</Button>
		</section>
	)
}
