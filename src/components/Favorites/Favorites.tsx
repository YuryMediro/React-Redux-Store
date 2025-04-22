import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Button } from '../../shared/Button/Button'
import s from './Favorites.module.css'
import noImage from '../../assets/noImage.webp'
import cross from '../../assets/cross.svg'
import {
	FavoritesItem,
	clearFavorites,
	removeFromFavorites,
} from '../../features/favoritses/favoritesSlice'
import { addCart } from '../../features/cart/cartSlice'
import { NavLink } from 'react-router-dom'
interface FavoritesProps {}

export const Favorites = ({}: FavoritesProps) => {
	const dispatch = useAppDispatch()
	const { favorites } = useAppSelector(state => state.favorites)

	const handleRemove = (id: number, size: number) => {
		dispatch(removeFromFavorites({ id, size }))
	}
	const handleClearFavorites = () => {
		dispatch(clearFavorites())
	}
	const handleAddToCart = (item: FavoritesItem, quantity: number) => {
		dispatch(
			addCart({
				...item.product,
				size: item.size,
				quantity: quantity,
			})
		)
	}
	return (
		<section className={s.wrapper}>
			<section className={s.header}>
				<h2 className={s.title}>Favorite products</h2>
				{favorites.length > 0 && (
					<Button onClick={handleClearFavorites} className={s.buttonClearCart}>
						Clear favorites
					</Button>
				)}
			</section>
			{favorites.length === 0 ? (
				<div className={s.emptyCart}>Your favorites is empty</div>
			) : (
				<>
					<section className={s.items}>
						{favorites.map(item => {
							return (
								<div
									key={`${item.product.id}-${item.size}`}
									className={s.cartItem}
								>
									<NavLink to={`/products/${item.product.id}`}>
										<img
											src={item.product.images[0]}
											alt={item.product.title}
											className={s.img}
											onError={e => {
												const target = e.target as HTMLImageElement
												target.src = noImage
											}}
										/>
									</NavLink>
									<div className={s.productInfo}>
										<div className={s.description}>
											<p className={s.productName}>{item.product.title}</p>
											<div className={s.productCategorySize}>
												<p className={s.productCategory}>
													{item.product.category.name}
												</p>
												<p className={s.size}>size: {item.size}</p>
											</div>
										</div>
										<div className={s.priceQuantity}>
											<p className={s.price}>{item.product.price}$</p>
											<Button
												onClick={() => handleAddToCart(item, 1)}
												className={s.button}
											>
												Add to Cart
											</Button>
											<button
												onClick={() => handleRemove(item.product.id, item.size)}
												className={s.remove}
											>
												<img src={cross} alt={'cross'} />
											</button>
										</div>
									</div>
								</div>
							)
						})}
					</section>
				</>
			)}
		</section>
	)
}
