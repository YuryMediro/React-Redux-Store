import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import s from './Favorites.module.css'
import noImage from '@assets/noImage.webp'
import cross from '@assets/cross.svg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { addCart } from '@features/cart/cartSlice'
import {
	FavoritesItem,
	removeFromFavorites,
	clearFavorites,
} from '@features/favorites/favoritesSlice'
import { Button } from '@shared/Button/Button'

export const Favorites = () => {
	const dispatch = useAppDispatch()
	const { items } = useAppSelector(state => state.favorites)
	const cartItems = useAppSelector(state => state.cart.items)

	// Состояние для уведомления
	const [notification, setNotification] = useState('')

	const isInCart = (item: FavoritesItem) => {
		return cartItems.some(
			cartItem => cartItem.id === item.id && cartItem.size === item.size
		)
	}
	const handleRemove = (id: number, size: number) => {
		dispatch(removeFromFavorites({ id, size }))
		setNotification('Item removed from favorites')
		setTimeout(() => {
			setNotification('')
		}, 2000)
	}
	const handleClearFavorites = () => {
		dispatch(clearFavorites())
		setNotification('All items have been removed from favorites')
		setTimeout(() => {
			setNotification('')
		}, 2000)
	}
	const handleAddToCart = (item: FavoritesItem, quantity: number) => {
		dispatch(
			addCart({
				...item,
				size: item.size,
				quantity: quantity,
			})
		)
		setNotification('Item added to cart')
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
			<section className={s.wrapper}>
				<section className={s.header}>
					<h2 className={s.title}>Favorite products</h2>
					{items.length > 0 && (
						<Button
							onClick={handleClearFavorites}
							className={s.buttonClearCart}
						>
							Clear favorites
						</Button>
					)}
				</section>

				{items.length === 0 ? (
					<div className={s.emptyCart}>Your favorites is empty</div>
				) : (
					<>
						<section className={s.items}>
							{items.map(item => {
								const inCart = isInCart(item)
								return (
									<div key={`${item.id}-${item.size}`} className={s.cartItem}>
										<NavLink to={`/products/${item.id}`}>
											<img
												src={item.images[0]}
												alt={item.title}
												className={s.img}
												onError={e => {
													const target = e.target as HTMLImageElement
													target.src = noImage
												}}
											/>
										</NavLink>
										<div className={s.productInfo}>
											<div className={s.description}>
												<p className={s.productName}>{item.title}</p>
												<div className={s.productCategorySize}>
													<p className={s.productCategory}>
														{item.category.name}
													</p>
													<p className={s.size}>size: {item.size}</p>
												</div>
											</div>
											<div className={s.priceQuantity}>
												<p className={s.price}>{item.price}$</p>

												{inCart ? (
													<NavLink to={'/shoppingCart'}>
														<button className={s.inCart}>In Cart</button>
													</NavLink>
												) : (
													<Button
														onClick={() => handleAddToCart(item, 1)}
														className={s.button}
													>
														Add to Cart
													</Button>
												)}

												<button
													onClick={() => handleRemove(item.id, item.size)}
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
		</>
	)
}
