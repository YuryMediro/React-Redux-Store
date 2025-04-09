import { NavLink } from 'react-router-dom'
import { ProductsType } from '../../features/products/productsSlice'
import s from './Products.module.css'

interface ProductsProps {
	products: ProductsType[]
	title: string
}

export const Products = ({ title, products }: ProductsProps) => {
	return (
		<section className={s.products}>
			{title && <h2 className={s.title}>{title}</h2>}
			<div className={s.cardContainer}>
				{products.slice(0, 5).map(product => (
					<NavLink
						className={s.card}
						to={`/products/${product.id}`}
						key={product.id}
					>
						{product.images && product.images.length > 0 && (
							<img
								src={product.images[0]}
								alt={product.title}
								className={s.image}
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
			<button className={s.button}>See more</button>
		</section>
	)
}
