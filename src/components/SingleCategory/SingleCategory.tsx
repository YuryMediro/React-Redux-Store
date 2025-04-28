import { NavLink } from 'react-router-dom'
import s from './SingleCategory.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import noImage from '@assets/noImage.webp'
import { ProductsType } from '@features/products/productsSlice'

interface SingleCategoryProps {
	products: ProductsType[] | null
}

export const SingleCategory = ({ products }: SingleCategoryProps) => {
	if (!products || products.length === 0) {
		return (
			<div className={s.category}>
				<h2 className={s.title}>Products not found</h2>
				<div className={s.emptyMessage}>
					There are no products in this category yet
				</div>
			</div>
		)
	}
	return (
		<div className={s.category}>
			<h2 className={s.title}>{products[0]?.category?.name || 'Category'}</h2>
			<Swiper
				className={s.swiper}
				modules={[Navigation]}
				slidesPerView={5} // Количество видимых слайдов
				navigation
				loop
				breakpoints={{
					771: {
						 slidesPerView: 5,
						
					},
					300: {
						 slidesPerView: 3,
						
					},
				}}
			>
				{products.map(product => (
					<SwiperSlide key={product.id} className={s.slide}>
						<NavLink className={s.card} to={`/products/${product.id}`}>
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
				<div className={`swiper-pagination`}></div>
			</Swiper>
		</div>
	)
}
