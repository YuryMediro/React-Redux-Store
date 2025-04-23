import s from './ShoppingCart.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import cross from '../../assets/cross.svg'
import noImage from '../../assets/noImage.webp'
import {
	clearCart,
	removeFromCart,
	updateQuantity,
} from '../../features/cart/cartSlice'
import { Button } from '../../shared/Button/Button'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export const ShoppingCart = () => {
	const { items } = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()

	// Состояние для уведомления
	const [notification, setNotification] = useState('')

	const handleRemove = (id: number, size: number) => {
		dispatch(removeFromCart({ id, size }))
		setNotification('Item removed from cart')
		setTimeout(() => {
			setNotification('')
		}, 2000)
	}

	const handleQuantityChange = (id: number, size: number, quantity: number) => {
		if (quantity < 1) return
		dispatch(updateQuantity({ id, size, quantity }))
	}

	const handleClearCart = () => {
		dispatch(clearCart())
		setNotification('All items have been removed from cart')
		setTimeout(() => {
			setNotification('')
		}, 2000)
	}

	const totalPrice = items.reduce((sum, item) => {
		return sum + item.price * item.quantity
	}, 0)

	return (
		<>
			{notification && (
				<div className={s.notification}>
					<span>{notification}</span>
				</div>
			)}
			<section className={s.wrapper}>
				<section className={s.header}>
					<h2 className={s.title}>Your cart</h2>
					{items.length > 0 && (
						<Button className={s.buttonClearCart} onClick={handleClearCart}>
							Clear cart
						</Button>
					)}
				</section>
				{items.length === 0 ? (
					<div className={s.emptyCart}>Your cart is empty</div>
				) : (
					<>
						<section className={s.items}>
							{items.map(item => {
								const itemTotalPrice = item.price * item.quantity
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

												<div className={s.quantity}>
													<FaMinus
														className={s.quantityButton}
														onClick={() =>
															handleQuantityChange(
																item.id,
																item.size,
																item.quantity - 1
															)
														}
													/>
													<span>{item.quantity}</span>
													<FaPlus
														className={s.quantityButton}
														onClick={() =>
															handleQuantityChange(
																item.id,
																item.size,
																item.quantity + 1
															)
														}
													/>
												</div>
												<div className={s.itemTotalPrice}>
													{itemTotalPrice}$
												</div>
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
				<section className={s.footer}>
					<p className={s.total}>
						TOTAL PRICE: <span>{totalPrice.toFixed(2)}$</span>
					</p>
					{items.length > 0 && (
						<Button className={s.button}>Proceed to checkout</Button>
					)}
				</section>
			</section>
		</>
	)
}
